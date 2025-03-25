import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import { motion } from "framer-motion";
import styles from "../styles/FavoritesPage.module.css";
import { toast } from "react-toastify";

const FavoritesPage = () => {
  const { favoritesList, removeFromFavorites, addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} добавлен в корзину!`, {
      position: "top-right",
    });
  };

  return (
    <div className={styles.container}>
      <Header cartCount={0} />
      <div className={styles.main}>
        <h1 className={styles.title}>Избранное</h1>
        {favoritesList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.empty}
          >
            Список избранного пуст
          </motion.div>
        ) : (
          <div className={styles.grid}>
            {favoritesList.map((product) => (
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
                <div className={styles.buttons}>
                  <button
                    className={styles.btnCart}
                    onClick={() => handleAddToCart(product)}
                  >
                    В корзину
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    Удалить
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;