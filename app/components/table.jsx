'use client';
import { useState, useCallback, useEffect } from 'react';

const guardNames = ['Логинов', 'Захаров', 'Орлов', 'Цветков', 'Тихомиров'];
const posts = {
  1: { name: 'Главный пост', startTime: [8, 0], endTime: [23, 30] },
  2: { name: 'Пост 2', startTime: [16, 45], endTime: [17, 15] },
  5: { name: 'Пост 5', startTime: [12, 0], endTime: [12, 30] },
  10: { name: 'Пост 10', startTime: [10, 30], endTime: [11, 0] },
  11: { name: 'Пост 11', startTime: [11, 0], endTime: [11, 30] },
  14: { name: 'Пост 14', startTime: [11, 30], endTime: [12, 0] },
};

function Table({ styles }) {
  const [selectedGuards, setSelectedGuards] = useState([]);
  const [schedule, setSchedule] = useState({});

  const handleAddGuard = useCallback((guardName) => {
    if (!selectedGuards.includes(guardName)) {
      setSelectedGuards([...selectedGuards, guardName]);
    }
  }, [selectedGuards]);

  useEffect(() => {
    generateSchedule();
  }, [selectedGuards]);

  const generateSchedule = () => {
    const newSchedule = { ...posts };
    const sortedGuards = [...selectedGuards];

    // Распределение по главному посту
    newSchedule[1].guards = [];

    const guardCount = sortedGuards.length;
    let guardIndex = 0;

    for (let hour = 8; hour < 23; hour++) {
      if (guardCount > 0) {
        const guardName = sortedGuards[guardIndex];
        const startHour = hour;
        const endHour = (hour + 1) % 24;
        const shift = `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00`;

        if (!newSchedule[1].guards[guardIndex]) {
          newSchedule[1].guards[guardIndex] = { name: guardName, times: [] };
        }
        newSchedule[1].guards[guardIndex].times.push(shift);

        guardIndex = (guardIndex + 1) % guardCount; // Переход к следующему охраннику
      }
    }

    // Добавление последней смены с 23:00 до 00:00
    if (guardCount > 0) {
      const guardName = sortedGuards[guardIndex];
      const shift = `23:00 - 00:00`;

      if (!newSchedule[1].guards[guardIndex]) {
        newSchedule[1].guards[guardIndex] = { name: guardName, times: [] };
      }
      newSchedule[1].guards[guardIndex].times.push(shift);
    }

    // Распределение по остальным постам
    Object.keys(newSchedule).forEach(postId => {
      if (postId !== '1') {
        const post = newSchedule[postId];
        const duration = (post.endTime[0] - post.startTime[0]) * 60 + post.endTime[1] - post.startTime[1];
        post.guards = [];
        for (let i = 0; i < duration; i += 30) {
          const guardIndex = (i / 30) % guardCount;
          post.guards.push(sortedGuards[guardIndex]);
        }
      }
    });

    setSchedule(newSchedule);
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
      <div className={styles.dvList}>
        <h3>Расписание</h3>
        {Object.keys(schedule).map(postId => (
          <div key={postId}>
            <h4>{schedule[postId]?.name}</h4>
            <p className={styles.p}>Время: {schedule[postId]?.startTime?.join(':')} - {schedule[postId]?.endTime?.join(':')}</p>
            <ul>
              {schedule[postId]?.guards?.map((guard, index) => (
                <li key={index}>{guard?.name}{postId === '1' ? ': ' + guard.times.join(', ') : ''}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;