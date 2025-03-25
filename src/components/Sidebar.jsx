import React from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3>Фильтры</h3>
      <div className={styles.filterGroup}>
        <label>Категория</label>
        <select>
          <option>Все</option>
          <option>Колонки</option>
          <option>Усилители</option>
          <option>Кабели</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Цена</label>
        <input type="range" min="0" max="50000" defaultValue="0" />
        <div className={styles.priceRange}>
          <span>0 ₽</span>
          <span>50,000 ₽</span>
        </div>
      </div>
      <div className={styles.filterGroup}>
        <label>Бренд</label>
        <div className={styles.checkbox}>
          <input type="checkbox" id="klipsch" />
          <label htmlFor="klipsch">Klipsch</label>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" id="sony" />
          <label htmlFor="sony">Sony</label>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" id="bose" />
          <label htmlFor="bose">Bose</label>
        </div>
      </div>
      <button className={styles.applyButton}>Применить</button>
    </div>
  );
};

export default Sidebar;