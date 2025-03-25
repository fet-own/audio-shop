import React from "react";
import styles from "../styles/Filters.module.css";

const Filters = ({
  sortOption,
  onSortChange,
  colorFilter,
  onColorFilter,
  priceRange,
  onPriceChange,
  clearFilters,
  itemsCount,
  tagFilter,
  onTagFilter,
  discountFilter,
  onDiscountFilter,
  brandFilter,
  onBrandFilter,
}) => {
  const colors = ["black", "white", "grey", "red", "blue", "brown", "silver"];
  const tags = ["NEW", "ХИТ"];
  const brands = [
    "QED",
    "MT-POWER",
    "AudioQuest",
    "Chord",
    "Van Den Hul",
    "Nordost",
    "Mogami",
    "Belkin",
    "Anker",
    "Hama",
    "Denon",
    "FiiO",
    "Bowers & Wilkins",
    "Klipsch",
    "Pro-Ject",
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.sort}>
        <label>Сортировать:</label>
        <select value={sortOption} onChange={onSortChange}>
          <option value="default">По умолчанию</option>
          <option value="price-asc">По цене (возр.)</option>
          <option value="price-desc">По цене (убыв.)</option>
        </select>
      </div>
      <div className={styles.colorFilter}>
        <label>Цвет:</label>
        <div className={styles.colors}>
          {colors.map((color) => (
            <div
              key={color}
              className={`${styles.color} ${
                colorFilter === color ? styles.active : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorFilter(color)}
            />
          ))}
        </div>
      </div>
      <div className={styles.tagFilter}>
        <label>Теги:</label>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagBtn} ${
                tagFilter === tag ? styles.active : ""
              } ${tag === "NEW" ? styles.tagNew : styles.tagHit}`}
              onClick={() => onTagFilter(tag === tagFilter ? "" : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.brandFilter}>
        <label>Бренд:</label>
        <select value={brandFilter} onChange={(e) => onBrandFilter(e.target.value)}>
          <option value="">Все бренды</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.discountFilter}>
        <label>
          <input
            type="checkbox"
            checked={discountFilter}
            onChange={() => onDiscountFilter(!discountFilter)}
          />
          Только со скидкой
        </label>
      </div>
      <div className={styles.priceFilter}>
        <label>Цена:</label>
        <div className={styles.priceInputs}>
          <input
            type="number"
            name="min"
            value={priceRange.min}
            onChange={onPriceChange}
            placeholder="0"
          />
          <input
            type="number"
            name="max"
            value={priceRange.max}
            onChange={onPriceChange}
            placeholder="100000"
          />
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          value={priceRange.max}
          onChange={(e) =>
            onPriceChange({ target: { name: "max", value: e.target.value } })
          }
        />
      </div>
      <div className={styles.clearBtn} onClick={clearFilters}>
        Сбросить фильтры
      </div>
      <div className={styles.itemsCount}>Найдено товаров: {itemsCount}</div>
    </div>
  );
};

export default Filters;