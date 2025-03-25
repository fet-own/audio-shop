import React from "react";
import Header from "../components/Header";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const AboutPage = () => {
  const { cart } = useContext(CartContext);
  return (
    <div>
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      <h1>О компании</h1>
      <p>Страница "О компании" в разработке.</p>
    </div>
  );
};

export default AboutPage;