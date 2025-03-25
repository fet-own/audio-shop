import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../styles/Header.module.css";

const Header = ({ cartCount }) => {
  const { compareList, favoritesList } = useContext(CartContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">АУДИОЦЕХ</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/">КАТАЛОГ</Link>
        <Link to="/services">УСЛУГИ</Link>
        <Link to="/company">О КОМПАНИИ</Link>
        <Link to="/blog">БЛОГ</Link>
        <Link to="/faq">ВОПРОС-ОТВЕТ</Link>
      </nav>
      <div className={styles.actions}>
        <div className={styles.search}>
          <input type="text" placeholder="Поиск..." />
          <button>🔍</button>
        </div>
        <Link to="/compare" className={styles.icon}>
          ⚖️ {compareList.length > 0 && <span>{compareList.length}</span>}
        </Link>
        <Link to="/favorites" className={styles.icon}>
          ❤️ {favoritesList.length > 0 && <span>{favoritesList.length}</span>}
        </Link>
        <Link to="/cart" className={styles.icon}>
          🛒 {cartCount > 0 && <span>{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;