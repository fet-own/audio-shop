import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import services from "../data/services";
import styles from "../styles/ServicesPage.module.css";
import { motion, AnimatePresence } from "framer-motion";

const ServicesPage = () => {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [selectedService, setSelectedService] = useState(null);

  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <div className={styles.container}>
      <Header cartCount={cartCount} />
      <div className={styles.main}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.breadcrumbSeparator}> / </span>
          <span>Услуги</span>
        </div>
        <h1 className={styles.title}>Услуги</h1>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <img
                src={service.image}
                alt={service.name}
                className={styles.serviceImage}
              />
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <button
                className={styles.serviceButton}
                onClick={() => openServiceModal(service)}
              >
                Подробнее
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно с анимацией */}
      <AnimatePresence>
        {selectedService && (
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
                <h3>{selectedService.name}</h3>
                <button onClick={closeServiceModal}>✖</button>
              </div>
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className={styles.modalImage}
              />
              <p>{selectedService.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;