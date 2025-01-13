'use client';
import React from 'react';
import { useState, useCallback, useEffect } from 'react';

const guardNames = ['Орлов', 'Тихомиров', 'Цветков', 'Логинов', 'Григорьев', 'Захаров'];

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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const savedGuards = localStorage.getItem('selectedGuards');
    const savedSchedule = localStorage.getItem('schedule');
    const savedStatus = localStorage.getItem('guardStatus');
    const savedConfirmation = localStorage.getItem('isConfirmed');

    if (savedGuards) setSelectedGuards(JSON.parse(savedGuards));
    if (savedSchedule) setSchedule(JSON.parse(savedSchedule));
    if (savedStatus) setGuardStatus(JSON.parse(savedStatus));
    if (savedConfirmation) {
      setIsConfirmed(JSON.parse(savedConfirmation));
      setTimeout(calculateTimeStatus, 0);
    }
  }, []);

  useEffect(() => {
    if (isConfirmed && Object.keys(schedule).length > 0) {
      calculateTimeStatus();
    }
  }, [schedule, isConfirmed]);

  useEffect(() => {
    if (isConfirmed) {
      calculateTimeStatus();
      
      const checkTime = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        
        if (minutes === 0 || minutes === 30) {
          calculateTimeStatus();
        }
      };

      const interval = setInterval(checkTime, 60000);
      return () => clearInterval(interval);
    }
  }, [isConfirmed]);

  useEffect(() => {
    localStorage.setItem('selectedGuards', JSON.stringify(selectedGuards));
  }, [selectedGuards]);

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('guardStatus', JSON.stringify(guardStatus));
  }, [guardStatus]);

  useEffect(() => {
    localStorage.setItem('isConfirmed', JSON.stringify(isConfirmed));
  }, [isConfirmed]);

  const handleAddGuard = useCallback((guardName) => {
    if (!selectedGuards.includes(guardName) && !isConfirmed) {
      setSelectedGuards([...selectedGuards, guardName]);
    }
  }, [selectedGuards, isConfirmed]);

  const handleReset = () => {
    setSelectedGuards([]);
    setSchedule({});
    setGuardStatus({});
    setIsConfirmed(false);
    localStorage.removeItem('selectedGuards');
    localStorage.removeItem('schedule');
    localStorage.removeItem('guardStatus');
    localStorage.removeItem('isConfirmed');
  };

  const calculateTimeStatus = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
    const newGuardStatus = {};

    Object.entries(posts).forEach(([postId, postData]) => {
      const postStartTimeInMinutes = postData.startTime[0] * 60 + postData.startTime[1];
      const postEndTimeInMinutes = postData.endTime[0] * 60 + postData.endTime[1];
      
      if (schedule[postId]?.guards) {
        schedule[postId].guards.forEach(guard => {
          if (!newGuardStatus[guard]) {
            newGuardStatus[guard] = {
              completedShifts: [],
              completedPosts: []
            };
          }
          
          if (currentTimeInMinutes > postEndTimeInMinutes || currentHour < 8) {
            newGuardStatus[guard].completedPosts.push(postId);
          }
        });
      }
    });

    Object.entries(schedule.guardShifts || {}).forEach(([guardName, shifts]) => {
      if (!newGuardStatus[guardName]) {
        newGuardStatus[guardName] = {
          completedShifts: [],
          completedPosts: []
        };
      }

      shifts.forEach(shift => {
        const [startTime] = shift.split(' - ');
        const [startHour] = startTime.split(':').map(Number);
        
        if (currentHour < 8 || currentHour > startHour || (currentHour === startHour && currentMinutes > 0)) {
          newGuardStatus[guardName].completedShifts.push(shift);
        }
      });
    });

    setGuardStatus(newGuardStatus);
  };

  const handleConfirm = () => {
    calculateTimeStatus();
    setIsConfirmed(true);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.table}>
      <select 
        className={styles.field} 
        onChange={(e) => handleAddGuard(e.target.value)}
        disabled={isConfirmed}
      >
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

      <button className={styles.confirmButton} onClick={handleConfirm} disabled={isConfirmed}>
        Подтвердить список
      </button>

      <button className={styles.reset} onClick={handleReset}>
        сброс списка
      </button>

      <div className={styles.dvList}>
        <h3 className={styles.h3}>Расписание</h3>     
        <div className={styles.time}>{currentTime}</div>
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
                        <span className={guardStatus[guardName]?.completedShifts?.includes(shift) ? styles.completedShift : ''}>
                          {shift}
                          {guardStatus[guardName]?.completedShifts?.includes(shift) && 
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
                  <li key={index} className={guardStatus[guard]?.completedPosts?.includes(postId) ? styles.completedShift : ''}>
                    {guard}
                    {guardStatus[guard]?.completedPosts?.includes(postId) && 
                      <span className={styles.checkmark}> ✓</span>
                    }
                  </li>
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
