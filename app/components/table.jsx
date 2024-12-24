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
    const guardHours = {};
    const guardShifts = {};

    // Инициализация часов и смен для каждого охранника
    sortedGuards.forEach(guard => {
        guardShifts[guard] = [];
        guardHours[guard] = 0;
    });

    // Распределение главного поста
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

    // Распределение второстепенных постов
    Object.keys(newSchedule).forEach(postId => {
        if (postId !== '1') {
            const post = newSchedule[postId];
            post.guards = [];
            
            if (guardCount > 0) {
                // Находим охранника с минимальной нагрузкой
                let minHours = Infinity;
                let selectedGuard = null;

                for (const guard of sortedGuards) {
                    const isGuardBusy = guardShifts[guard].some(shift => {
                        const [shiftStart] = shift.split(' - ').map(time => parseInt(time.split(':')[0]));
                        return shiftStart === post.startTime[0];
                    });

                    if (!isGuardBusy && guardHours[guard] < minHours) {
                        minHours = guardHours[guard];
                        selectedGuard = guard;
                    }
                }

                if (selectedGuard) {
                    post.guards.push(selectedGuard);
                    guardHours[selectedGuard] += 0.5;
                }
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
          <div key={postId} className={`${styles.postIdAll} ${styles[`postId${postId}`]}`}>
            <h4>{schedule[postId]?.name}</h4>
            <div className={styles.p}>Время: {schedule[postId]?.startTime?.join(':')} - {schedule[postId]?.endTime?.join(':')}</div>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
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
