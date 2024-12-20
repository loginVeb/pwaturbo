'use client'

import { useState } from 'react';

const guardNames = ['Логинов', 'Захаров', 'Орлов', 'Цветков', 'Тихомиров'];

function Table({ styles }) {
  const [selectedGuards, setSelectedGuards] = useState([]);

  const handleAddGuard = (guardName) => {
    if (!selectedGuards.includes(guardName)) {
      setSelectedGuards([...selectedGuards, guardName]);
    }
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
        <ul className={styles.list}>
          {selectedGuards.map((guardName, index) => (
            <li key={index} className={styles.listItem} data-index={index + 1}>{guardName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Table;