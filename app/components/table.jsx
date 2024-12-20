'use client'

const guardNames = ['Логинов', 'Захаров', 'Орлов', 'Цветков', 'Тихомиров'];

function Table({ styles }) {
  return (
    <div className={styles.table}>
     

      <select className={styles.field}>
        {guardNames.map((guardName) => (
          <option key={guardName} value={guardName}>
            {guardName}
          </option>
        ))}
      </select>

      <button className={styles.addGuard}>
        Добавить охранника
      </button>

      <button className={styles.confirmButton}>
        Подтвердить список
      </button>

      <ul className={styles.list}>
        <li className={styles.listItem}>
          
        </li>
      </ul>
    </div>
    
      


  );
}

export default Table;