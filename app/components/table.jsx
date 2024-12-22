'use client'

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
    for (let i = 0; i < sortedGuards.length; i++) {
      const guardName = sortedGuards[i];
      let shiftTime = null;
      
      // Устанавливаем уникальный час дежурства с 23:00 до 24:00
      if (shiftTime === null) {
        shiftTime = [23, 0];
      }

      const shifts = [
        `${8 + Math.floor(i)}:00 - ${9 + Math.floor(i)}:00`,
        `${13 + Math.floor(i)}:00 - ${14 + Math.floor(i)}:00`,
        `${18 + Math.floor(i)}:00 - ${19 + Math.floor(i)}:00`,
        `${shiftTime.join(':')} - ${shiftTime.join(':')}`
      ];
      newSchedule[1].guards.push({ name: guardName, times: shifts });
    }

    // Распределение по остальным постам
    Object.keys(newSchedule).forEach(postId => {
      if (postId !== '1') {
        const post = newSchedule[postId];
        const duration = (post.endTime[0] - post.startTime[0]) * 60 + post.endTime[1] - post.startTime[1];
        post.guards = [];
        for (let i = 0; i < duration; i += 30) {
          const guardIndex = (i + sortedGuards.length) % sortedGuards.length;
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