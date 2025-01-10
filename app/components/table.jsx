'use client';
import React from 'react';
import { useState, useCallback, useEffect } from 'react';

const guardNames = ['Орлов', 'Тихомиров', 'Цветков', 'Логинов', 'Горигорьев', 'Захаров'];

const posts = {
  1: { name: 'пост 1', startTime: [8, 0], endTime: [23, 0] },
  2: { name: 'Пост 2', startTime: [16, 45], endTime: [17, 15] },
  5: { name: 'Пост 5', startTime: [12, 0], endTime: [12, 30] },
  10: { name: 'Пост 10', startTime: [10, 30], endTime: [11, 0] },
  11: { name: 'Пост 11', startTime: [11, 0], endTime: [11, 30] },
  14: { name: 'Пост 14', startTime: [11, 30], endTime: [12, 0] }
};

function Table({ styles }) {
  const [selectedGuards, setSelectedGuards] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [guardStatus, setGuardStatus] = useState({});

  useEffect(() => {
    const savedGuards = localStorage.getItem('selectedGuards');
    const savedSchedule = localStorage.getItem('schedule');
    const savedStatus = localStorage.getItem('guardStatus');

    if (savedGuards) setSelectedGuards(JSON.parse(savedGuards));
    if (savedSchedule) setSchedule(JSON.parse(savedSchedule));
    if (savedStatus) setGuardStatus(JSON.parse(savedStatus));
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedGuards', JSON.stringify(selectedGuards));
  }, [selectedGuards]);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('guardStatus', JSON.stringify(guardStatus));
  }, [guardStatus]);

  const handleAddGuard = useCallback((guardName) => {
    if (!selectedGuards.includes(guardName)) {
      setSelectedGuards([...selectedGuards, guardName]);
    }
  }, [selectedGuards]);

  const handleReset = () => {
    setSelectedGuards([]);
    setSchedule({});
    setGuardStatus({});
    localStorage.removeItem('selectedGuards');
    localStorage.removeItem('schedule');
    localStorage.removeItem('guardStatus');
  };

  const calculateTimeStatus = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const newGuardStatus = {};

    Object.entries(schedule.guardShifts || {}).forEach(([guardName, shifts]) => {
      newGuardStatus[guardName] = {
        completedShifts: [],
        activeShift: null
      };

      shifts.forEach(shift => {
        const [startTime] = shift.split(' - ');
        const [startHour] = startTime.split(':').map(Number);
        
        // Проверяем время с учетом перехода через полночь
        if (currentHour < 8) { // Если сейчас ночь (после полуночи)
          newGuardStatus[guardName].completedShifts.push(shift);
        } else if (currentHour > startHour || (currentHour === startHour && currentMinutes > 0)) {
          newGuardStatus[guardName].completedShifts.push(shift);
        }
      });
    });

    setGuardStatus(newGuardStatus);
  };

  const handleConfirm = () => {
    calculateTimeStatus();
  };

  useEffect(() => {
    generateSchedule();
  }, [selectedGuards]);

  const generateSchedule = () => {
    const newSchedule = JSON.parse(JSON.stringify(posts));
    const sortedGuards = [...selectedGuards];
    const guardCount = sortedGuards.length;
    const guardHours = {};
    const guardShifts = {};

    sortedGuards.forEach(guard => {
      guardShifts[guard] = [];
      guardHours[guard] = 0;
    });

    let guardIndex = 0;
    for (let hour = 8; hour < 23; hour++) {
      if (guardCount > 0) {
        const guardName = sortedGuards[guardIndex];
        const shift = `${String(hour).padStart(2, '0')}:00 - ${String((hour + 1) % 24).padStart(2, '0')}:00`;
        guardShifts[guardName].push(shift);
        guardHours[guardName]++;
        guardIndex = (guardIndex + 1) % guardCount;
      }
    }

    if (guardCount > 0) {
      const guardName = sortedGuards[guardIndex];
      guardShifts[guardName].push(`23:00 - 00:00`);
      guardHours[guardName]++;
    }

    Object.keys(newSchedule).forEach(postId => {
      if (postId !== '1') {
        const post = newSchedule[postId];
        post.guards = [];

        if (guardCount > 1) {
          let minHours = Math.min(...Object.values(guardHours));
          let selectedGuard = Object.keys(guardHours).find(guard => guardHours[guard] === minHours);

          if (selectedGuard) {
            post.guards.push(selectedGuard);
            const duration = ((post.endTime[0] * 60 + post.endTime[1]) - (post.startTime[0] * 60 + post.startTime[1])) / 60;
            guardHours[selectedGuard] += duration;
          }
        }
      }
    });

    setSchedule({ ...newSchedule, guardShifts, guardHours });
  };

  return (
    <div className={styles.table}>
      <select className={styles.field} onChange={(e) => handleAddGuard(e.target.value)}>
        <option value="">составить смену</option>
        {guardNames.filter(name => !selectedGuards.includes(name)).map((guardName) => (
          <option key={guardName} value={guardName}>
            {guardName}
          </option>
        ))}
      </select>

      <select className={styles.fieldAdd}>
        <option value="">добавить в 19:00</option>
      </select>

      <select className={styles.fieldЕxclude}>
        <option value="">исключить в 19:00</option>
      </select>

      <button className={styles.confirmButton} onClick={handleConfirm}>
        Подтвердить список
      </button>

      <button className={styles.reset} onClick={handleReset}>
        сброс списка
      </button>

      <div className={styles.dvList}>
        <h3 className={styles.h3}>Расписание</h3>
        {Object.keys(posts).map(postId => (
          <div key={postId} className={`${styles.postIdAll} ${styles[`postId${postId}`]}`}>
            <h4>{schedule[postId]?.name}</h4>
            <div className={styles.p}>
              Время: {schedule[postId]?.startTime?.map(time => String(time).padStart(2, '0')).join(':')} -
              {schedule[postId]?.endTime?.map(time => String(time).padStart(2, '0')).join(':')}
            </div>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              {postId === '1' ? (
                Object.entries(schedule.guardShifts || {}).map(([guardName, shifts]) => (
                  <li key={guardName}>
                    <strong>{guardName}:</strong>{' '}
                    {shifts.map((shift, index) => (
                      <React.Fragment key={shift}>
                        <span className={guardStatus[guardName]?.completedShifts.includes(shift) ? styles.completedShift : ''}>
                          {shift}
                          {guardStatus[guardName]?.completedShifts.includes(shift) && 
                            <span className={styles.checkmark}> ✓</span>
                          }
                        </span>
                        {index < shifts.length - 1 && <span>, </span>}
                      </React.Fragment>
                    ))}
                    <div>сумма часов: {Number(schedule.guardHours?.[guardName] || 0).toFixed(2)}</div>
                  </li>
                ))
              ) : (
                schedule[postId]?.guards?.map((guard, index) => (
                  <li key={index}>{guard}</li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
