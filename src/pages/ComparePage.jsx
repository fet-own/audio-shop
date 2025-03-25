import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import styles from "../styles/ComparePage.module.css";
import { motion } from "framer-motion";

const ComparePage = () => {
  const { compareList, removeFromCompare } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Header cartCount={0} />
      <div className={styles.main}>
        <h1 className={styles.title}>Сравнение товаров</h1>
        {compareList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.empty}
          >
            Список сравнения пуст
          </motion.div>
        ) : (
          <div className={styles.compareTable}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {compareList.map((item) => (
                    <th key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.productImage}
                        />
                        <p>{item.name}</p>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCompare(item.id)}
                        >
                          Удалить
                        </button>
                      </motion.div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Цена</td>
                  {compareList.map((item) => (
                    <td key={item.id}>
                      {item.discountedPrice || item.price} ₽
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Описание</td>
                  {compareList.map((item) => (
                    <td key={item.id}>{item.description}</td>
                  ))}
                </tr>
                <tr>
                  <td>Категория</td>
                  {compareList.map((item) => (
                    <td key={item.id}>{item.category}</td>
                  ))}
                </tr>
                <tr>
                  <td>Цвет</td>
                  {compareList.map((item) => (
                    <td key={item.id}>{item.color}</td>
                  ))}
                </tr>
                <tr>
                  <td>Теги</td>
                  {compareList.map((item) => (
                    <td key={item.id}>
                      {item.tags.length > 0 ? item.tags.join(", ") : "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;