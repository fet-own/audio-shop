import React, { useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data/products";
import styles from "../styles/CatalogPage.module.css";

const CatalogPage = () => {
  const { cart, addToCart, addToCompare, addToFavorites, compareList, favoritesList } =
    useContext(CartContext);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Показываем 9 товаров на страницу
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className={styles.container}>
      <Header cartCount={cartCount} />
      <div className={styles.main}>
        <div className={styles.layout}>
          <Sidebar />
          <div className={styles.content}>
            <h1 className={styles.title}>Каталог</h1>
            <ProductGrid
              products={paginatedProducts}
              addToCart={addToCart}
              addToCompare={addToCompare}
              addToFavorites={addToFavorites}
              compareList={compareList}
              favoritesList={favoritesList}
            />
            {totalPages > 1 && ( // Убедимся, что пагинация отображается только если страниц больше 1
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? styles.activePage : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;