'use client';
import { useState, useCallback, useEffect } from 'react';

const guardNames = ['Логинов', 'Захаров', 'Орлов', 'Цветков', 'Тихомиров'];

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

  // Загрузка сохраненных данных при запуске
  useEffect(() => {
    const savedGuards = localStorage.getItem('selectedGuards');
    const savedSchedule = localStorage.getItem('schedule');
    
    if (savedGuards) {
      setSelectedGuards(JSON.parse(savedGuards));
    }
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  // Сохранение данных при изменениях
  useEffect(() => {
    localStorage.setItem('selectedGuards', JSON.stringify(selectedGuards));
  }, [selectedGuards]);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  const handleAddGuard = useCallback((guardName) => {
    if (!selectedGuards.includes(guardName)) {
      setSelectedGuards([...selectedGuards, guardName]);
    }
  }, [selectedGuards]);

  const handleReset = () => {
    setSelectedGuards([]);
    setSchedule({});
    localStorage.removeItem('selectedGuards');
    localStorage.removeItem('schedule');
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
        <option value="">Выберите охранника</option>
        {guardNames.filter(name => !selectedGuards.includes(name)).map((guardName, index) => (
          <option key={guardName} value={guardName} data-index={index + 1}>
            {guardName}
          </option>
        ))}
      </select>
      <button className={styles.confirmButton} onClick={() => console.log(selectedGuards)}>
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
                    <strong>{guardName}:</strong> {shifts.join(', ')} сумма часов: {Number(schedule.guardHours?.[guardName] || 0).toFixed(2)}
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
