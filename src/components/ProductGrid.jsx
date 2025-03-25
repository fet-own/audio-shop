import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/ProductGrid.module.css";

const ProductGrid = ({
  products,
  addToCart,
  addToCompare,
  addToFavorites,
  compareList,
  favoritesList,
}) => {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {})
  );
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToFavorites = (product) => {
    addToFavorites(product);
    alert(`${product.name} добавлен в избранное!`);
  };

  const handleBuy = (product, quantity) => {
    addToCart(product, quantity);
    alert(`${product.name} добавлен в корзину!`);
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className={styles.grid}>
      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.empty}
        >
          Товары не найдены
        </motion.div>
      ) : (
        products.map((product) => (
          <motion.div
            key={product.id}
            className={styles.item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {product.discount && (
              <div className={styles.discount}>-{product.discount}%</div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <h3>{product.name}</h3>
            <div className={styles.fullName}>{product.fullName}</div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.priceWrapper}>
              <span className={styles.originalPrice}>{product.price} ₽</span>
              {product.discountedPrice && (
                <span className={styles.discountedPrice}>
                  {product.discountedPrice} ₽
                </span>
              )}
            </div>
            {product.tags.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`${styles.tag} ${
                      tag === "NEW" ? styles.tagNew : styles.tagHit
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button onClick={() => handleQuantityChange(product.id, -1)}>
                  -
                </button>
                <span>{quantities[product.id]}</span>
                <button onClick={() => handleQuantityChange(product.id, 1)}>
                  +
                </button>
              </div>
              <div className={styles.icons}>
                <button
                  onClick={() => addToCompare(product)}
                  className={`${styles.icon} ${
                    compareList.find((item) => item.id === product.id)
                      ? styles.active
                      : ""
                  }`}
                >
                  ⚖️
                </button>
                <button
                  onClick={() => handleAddToFavorites(product)}
                  className={`${styles.icon} ${
                    favoritesList.find((item) => item.id === product.id)
                      ? styles.active
                      : ""
                  }`}
                >
                  ❤️
                </button>
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.btnCart}
                onClick={() => addToCart(product, quantities[product.id])}
              >
                В корзину
              </button>
              <button
                className={styles.btnBuy}
                onClick={() => handleBuy(product, quantities[product.id])}
              >
                Купить
              </button>
              <button
                className={styles.btnQuickView}
                onClick={() => openQuickView(product)}
              >
                Быстрый просмотр
              </button>
            </div>
          </motion.div>
        ))
      )}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.modalHeader}>
                <h3>{selectedProduct.name}</h3>
                <button onClick={closeQuickView}>✖</button>
              </div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className={styles.modalImage}
              />
              <p>{selectedProduct.fullName}</p>
              <p>{selectedProduct.description}</p>
              <p>Цена: {selectedProduct.discountedPrice || selectedProduct.price} ₽</p>
              {selectedProduct.tags.length > 0 && (
                <div className={styles.tags}>
                  {selectedProduct.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`${styles.tag} ${
                        tag === "NEW" ? styles.tagNew : styles.tagHit
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;