import React from "react";
import Header from "../components/Header";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const FaqPage = () => {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <h1>Вопрос-Ответ</h1>
      <p>Страница "Вопрос-Ответ" в разработке.</p>
    </div>
  );
};

export default FaqPage;