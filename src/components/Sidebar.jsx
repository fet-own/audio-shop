import React, { useState } from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar = ({ onFilterChange }) => {
  const [sortOption, setSortOption] = useState("default");
  const [searchOption, setSearchOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Hi-Fi",
    "Акустические Системы",
    "Кабели",
    "Акустические Кабели",
    "Оптические HDMI Кабели",
    "Межблочные Аналоговые",
    "Межблочные Цифровые",
    "Кабели в Нарезку",
    "Сетевые Кабели Аудио",
    "Профессиональные",
    "Кабели Ethernet RJ 45",
    "Активные Кабели",
    "Видео Кабели",
  ];

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceRange([0, parseInt(value)]);
    onFilterChange({ priceRange: [0, parseInt(value)], categories: selectedCategories });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onFilterChange({ priceRange, categories: updatedCategories });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onFilterChange({ priceRange, categories: selectedCategories, sort: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchOption(e.target.value);
    onFilterChange({ priceRange, categories: selectedCategories, search: e.target.value });
  };

  const clearFilters = () => {
    setPriceRange([0, 100000]);
    setSelectedCategories([]);
    setSortOption("default");
    setSearchOption("default");
    onFilterChange({ priceRange: [0, 100000], categories: [], sort: "default", search: "default" });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sortGroup}>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="default">Сортировка: Параметр</option>
          <option value="price-asc">Цена: по возрастанию</option>
          <option value="price-desc">Цена: по убыванию</option>
        </select>
        <select value={searchOption} onChange={handleSearchChange}>
          <option value="default">Искать Выбрать</option>
          <option value="in-stock">В наличии</option>
          <option value="on-order">Под заказ</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <div className={styles.priceRange}>
          <span>{priceRange[0]}</span>
          <span>-</span>
          <span>{priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          value={priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>
      <div className={styles.filterGroup}>
        <span>Показать: {selectedCategories.length > 0 ? selectedCategories.length : "Все"}</span>
      </div>
      <div className={styles.filterGroup}>
        {categories.map((category) => (
          <div key={category} className={styles.checkbox}>
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className={styles.activeFilters}>
        <span>АКТ. Фильтры: {selectedCategories.length}</span>
        <button onClick={clearFilters}>Очистить Фильтры</button>
      </div>
    </div>
  );
};

export default Sidebar;