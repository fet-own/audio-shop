import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/CartPage.module.css";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + (item.discountedPrice || item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowConfirmModal(true);
  };

  const confirmOrder = () => {
    setShowConfirmModal(false);
    setShowOrderForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitOrder = (e) => {
    e.preventDefault();
    setCart([]);
    setShowOrderForm(false);
    toast.success("Заказ успешно оформлен! Мы свяжемся с вами скоро.", {
      position: "top-right",
    });
  };

  return (
    <div className={styles.container}>
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <div className={styles.main}>
        <h1 className={styles.title}>Корзина</h1>
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.empty}
          >
            Корзина пуста
          </motion.div>
        ) : (
          <div className={styles.cart}>
            <div className={styles.items}>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p>{item.fullName}</p>
                    <p>
                      Цена: {(item.discountedPrice || item.price) * item.quantity} ₽
                    </p>
                    <div className={styles.quantity}>
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className={styles.summary}>
              <h3>Итого: {totalPrice} ₽</h3>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Оформить заказ
              </button>
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {showConfirmModal && (
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
              <h3>Подтверждение заказа</h3>
              <p>Вы уверены, что хотите оформить заказ на сумму {totalPrice} ₽?</p>
              <div className={styles.modalButtons}>
                <button
                  className={styles.confirmBtn}
                  onClick={confirmOrder}
                >
                  Подтвердить
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowConfirmModal(false)}
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showOrderForm && (
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
              <h3>Оформление заказа</h3>
              <form onSubmit={submitOrder}>
                <div className={styles.formGroup}>
                  <label>Имя:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Телефон:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Адрес доставки:</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.confirmBtn}>
                    Отправить
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => setShowOrderForm(false)}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;