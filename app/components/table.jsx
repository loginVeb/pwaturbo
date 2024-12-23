'use client';
import { useState, useCallback, useEffect } from 'react';

const guardNames = ['Логинов', 'Захаров', 'Орлов', 'Цветков', 'Тихомиров'];

const posts = {
  1: { name: 'Главный пост', startTime: [8, 0], endTime: [23, 0] },
  2: { name: 'Пост 2', startTime: [16, 45], endTime: [17, 15] },
  5: { name: 'Пост 5', startTime: [12, 0], endTime: [12, 30] },
  10: { name: 'Пост 10', startTime: [10, 30], endTime: [11, 0] },
  11: { name: 'Пост 11', startTime: [11, 0], endTime: [11, 30] },
  14: { name: 'Пост 14', startTime: [11, 30], endTime: [12, 0] }
};

function Table({ styles }) {
  const [selectedGuards, setSelectedGuards] = useState([]);
  const [schedule, setSchedule] = useState({});

  const handleAddGuard = useCallback((guardName) => {
    if (!selectedGuards.includes(guardName)) {
      setSelectedGuards([...selectedGuards, guardName]);
    }
  }, [selectedGuards]);

  const handleReset = () => {
    setSelectedGuards([]);
    setSchedule({});
  };

  useEffect(() => {
    generateSchedule();
  }, [selectedGuards]);

  const generateSchedule = () => {
    const newSchedule = JSON.parse(JSON.stringify(posts));
    const sortedGuards = [...selectedGuards];
    const guardCount = sortedGuards.length;
    let guardIndex = 0;
    const guardHours = Array(guardCount).fill(0);
    const guardShifts = {};

    sortedGuards.forEach(guard => {
      guardShifts[guard] = [];
    });

    // Распределение по главному посту
    for (let hour = 8; hour < 23; hour++) {
      if (guardCount > 0) {
        const guardName = sortedGuards[guardIndex];
        const startHour = hour;
        const endHour = (hour + 1) % 24;
        const shift = `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00`;

        guardShifts[guardName].push(shift);
        guardHours[guardIndex] += 1;

        guardIndex = (guardIndex + 1) % guardCount;
      }
    }

    // Добавление последней смены с 23:00 до 00:00
    if (guardCount > 0) {
      const guardName = sortedGuards[guardIndex];
      const shift = `23:00 - 00:00`;

      guardShifts[guardName].push(shift);
      guardHours[guardIndex] += 1;
    }

    // Распределение по остальным постам
    Object.keys(newSchedule).forEach(postId => {
      if (postId !== '1') {
        const post = newSchedule[postId];
        const startTime = post.startTime;
        const endTime = post.endTime;
        post.guards = [];

        let minHours = Infinity;
        let selectedGuard = null;

        for (let i = 0; i < guardCount; i++) {
          const guardName = sortedGuards[i];
          const guardIsFree = !guardShifts[guardName].some(shift => {
            const [start, end] = shift.split(' - ').map(time => parseInt(time.split(':')[0], 10));
            return (
              (startTime[0] >= start && startTime[0] < end) ||
              (endTime[0] > start && endTime[0] <= end)
            );
          });

          if (guardIsFree && guardHours[i] < minHours) {
            minHours = guardHours[i];
            selectedGuard = guardName;
          }
        }

        if (selectedGuard) {
          post.guards.push(selectedGuard);
          guardHours[sortedGuards.indexOf(selectedGuard)] += 0.5;
        }
      }
    });

    setSchedule({ ...newSchedule, guardShifts });
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
          <div key={postId} className={styles[`postId${postId}`]}>
            <h4>{schedule[postId]?.name}</h4>
            <p className={styles.p}>Время: {schedule[postId]?.startTime?.join(':')} - {schedule[postId]?.endTime?.join(':')}</p>
            <ul>
              {postId === '1' ? (
                Object.entries(schedule.guardShifts || {}).map(([guardName, shifts]) => (
                  <li key={guardName}>
                    <strong>{guardName}:</strong> {shifts.join(', ')}
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
