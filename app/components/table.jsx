'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';

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
  const [currentTime, setCurrentTime] = useState('');
  const [addGuardAt19Value, setAddGuardAt19Value] = useState([]);
  const [addedGuardsAt19, setAddedGuardsAt19] = useState([]);

  const addGuardAt19Ref = useRef(null);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedGuards = localStorage.getItem('selectedGuards');
    const savedSchedule = localStorage.getItem('schedule');
    const savedStatus = localStorage.getItem('guardStatus');
    const savedConfirmation = localStorage.getItem('isConfirmed');
    const savedAddedGuardsAt19 = localStorage.getItem('addedGuardsAt19');

    if (savedGuards) setSelectedGuards(JSON.parse(savedGuards));
    if (savedSchedule) setSchedule(JSON.parse(savedSchedule));
    if (savedStatus) setGuardStatus(JSON.parse(savedStatus));
    if (savedConfirmation) {
      setIsConfirmed(JSON.parse(savedConfirmation));
      setTimeout(calculateTimeStatus, 0);
    }
    if (savedAddedGuardsAt19) setAddedGuardsAt19(JSON.parse(savedAddedGuardsAt19));
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

  useEffect(() => {
    localStorage.setItem('addedGuardsAt19', JSON.stringify(addedGuardsAt19));
  }, [addedGuardsAt19]);

  const handleAddGuard = useCallback((guardName) => {
    if (!selectedGuards.includes(guardName) && !isConfirmed) {
      setSelectedGuards(prev => [...prev, guardName]);
    }
  }, [selectedGuards, isConfirmed]);

  const findGuardWithShift = (guardShifts, targetShift) => {
    for (const [guard, shifts] of Object.entries(guardShifts)) {
      if (shifts.includes(targetShift)) {
        return guard;
      }
    }
    return null;
  };

  const handleAddGuardAt19 = (guardName) => {
    if (!guardName) return;

    const newSchedule = { ...schedule };
    const guardShifts = { ...newSchedule.guardShifts };
    const guardHours = { ...newSchedule.guardHours };

    if (!guardShifts[guardName]) {
      guardShifts[guardName] = [];
      guardHours[guardName] = 0;
    }

    const lastGuardBefore19 = findGuardWithShift(guardShifts, '18:00 - 19:00');
    const activeGuards = [...new Set([...Object.keys(guardShifts), guardName])];
    const sortedActiveGuards = guardNames.filter(name => activeGuards.includes(name));
    const lastGuardIndex = lastGuardBefore19 ? sortedActiveGuards.indexOf(lastGuardBefore19) : -1;

    Object.keys(guardShifts).forEach(guard => {
      guardShifts[guard] = guardShifts[guard].filter(shift => {
        const [startTime] = shift.split(' - ');
        const [hour] = startTime.split(':').map(Number);
        return hour < 19;
      });
    });

    let startIndex = lastGuardIndex !== -1 ?
      (lastGuardIndex + 1) % sortedActiveGuards.length :
      sortedActiveGuards.indexOf(guardName);

    for (let hour = 19; hour < 23; hour++) {
      const currentGuard = sortedActiveGuards[startIndex % sortedActiveGuards.length];
      const shift = `${String(hour).padStart(2, '0')}:00 - ${String(hour + 1).padStart(2, '0')}:00`;
      guardShifts[currentGuard].push(shift);
      guardHours[currentGuard] = (guardHours[currentGuard] || 0) + 1;
      startIndex++;
    }

    const lastGuard = sortedActiveGuards[startIndex % sortedActiveGuards.length];
    guardShifts[lastGuard].push('23:00 - 00:00');
    guardHours[lastGuard]++;

    setSchedule({
      ...newSchedule,
      guardShifts,
      guardHours
    });

    setAddedGuardsAt19(prev => {
      const updatedGuards = [...prev, guardName];
      localStorage.setItem('addedGuardsAt19', JSON.stringify(updatedGuards));
      return updatedGuards;
    });

    if (addGuardAt19Ref.current) {
      addGuardAt19Ref.current.blur();
    }

    setAddGuardAt19Value('');
  };

  const handleReset = () => {
    setSelectedGuards([]);
    setSchedule({});
    setGuardStatus({});
    setIsConfirmed(false);
    setAddedGuardsAt19([]);
    localStorage.removeItem('selectedGuards');
    localStorage.removeItem('schedule');
    localStorage.removeItem('guardStatus');
    localStorage.removeItem('isConfirmed');
    localStorage.removeItem('addedGuardsAt19');
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
    const firstSelectedGuardIndex = guardNames.findIndex(name => name === selectedGuards[0]);
    const reorderedGuardNames = [
      ...guardNames.slice(firstSelectedGuardIndex),
      ...guardNames.slice(0, firstSelectedGuardIndex)
    ];
    const sortedGuards = reorderedGuardNames.filter(name => selectedGuards.includes(name));
    const guardCount = sortedGuards.length;
    const guardHours = {};
    const guardShifts = {};

    sortedGuards.forEach(guard => {
      guardShifts[guard] = [];
      guardHours[guard] = 0;
    });

    let guardIndex = 0;
    for (let hour = 8; hour < 24; hour++) { // Изменено на 24, чтобы учитывать смены до 23:00
      if (guardCount > 0) {
        const guardName = sortedGuards[guardIndex];
        const shift = `${String(hour).padStart(2, '0')}:00 - ${String((hour + 1) % 24).padStart(2, '0')}:00`;
        guardShifts[guardName].push(shift);
        guardHours[guardName]++;
        guardIndex = (guardIndex + 1) % guardCount;
      }
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
      <select
        className={styles.field}
        onChange={(e) => handleAddGuard(e.target.value)}
        disabled={isConfirmed}
      >
        <option value="" hidden>составить смену</option>
        <option value="" disabled>Фикс очередь, составил старший смены</option>
        {guardNames.filter(name => !selectedGuards.includes(name)).map((guardName) => (
          <option key={guardName} value={guardName}>
            {guardName}
          </option>
        ))}
      </select>

      <select
        className={styles.fieldAdd}
        onChange={(e) => {
          handleAddGuardAt19(e.target.value);
          setAddGuardAt19Value(''); // Сбрасываем значение после выбора
          if (addGuardAt19Ref.current) {
            addGuardAt19Ref.current.blur(); // Убираем фокус
          }
        }}
        value={addGuardAt19Value}
        disabled={isConfirmed}
        ref={addGuardAt19Ref} // Присваиваем реф
      >
        <option value="" hidden>добавить в 19:00</option>
        {guardNames
          .filter(name => !selectedGuards.includes(name) && !addedGuardsAt19.includes(name)) // Фильтруем уже выбранных охранников
          .map((guardName) => (
            <option key={guardName} value={guardName}>
              {guardName}
            </option>
          ))
        }
      </select>

      <select className={styles.fieldЕxclude}>
        <option value="" hidden>исключить в 19:00</option>
        {selectedGuards.map((guardName) => (
          <option key={guardName} value={guardName}>
            {guardName}
          </option>
        ))}
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
                guardNames
                  .filter(name => schedule.guardShifts?.[name])
                  .map((guardName) => (
                    <li key={guardName} className={styles.guardListItem}>
                      <strong>{guardName}:</strong>{' '}
                      {(schedule.guardShifts[guardName] || []).map((shift, index) => (
                        <React.Fragment key={shift}>
                          <span className={guardStatus[guardName]?.completedShifts?.includes(shift) ? styles.completedShift : ''}>
                            {shift}
                            {guardStatus[guardName]?.completedShifts?.includes(shift) &&
                              <span className={styles.checkmark}> ✓</span>
                            }
                          </span>
                          {index < schedule.guardShifts[guardName].length - 1 && <span>, </span>}
                        </React.Fragment>
                      ))}
                      <div>дежурные часы: {Number(schedule.guardHours?.[guardName] || 0).toFixed(2)}</div>
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