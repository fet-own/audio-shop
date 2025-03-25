import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../styles/BlogPage.module.css";

const BlogPage = () => {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className={styles.container}>
      <Header cartCount={cartCount} />
      <div className={styles.main}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.breadcrumbSeparator}> / </span>
          <span>Блог</span>
        </div>
        <h1 className={styles.title}>Блог</h1>
        <p>Здесь будут наши статьи о звуке, аудиотехнике и не только. Пока в разработке!</p>
      </div>
    </div>
  );
};

export default BlogPage;