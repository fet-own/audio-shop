import productImage from "../assets/photo_2025-03-17_14-38-35.jpg";

const products = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `RP-${240 + index}D`,
  fullName: `АУДИОЦЕХ MT-POWER АКУСТИЧЕСКИЙ HDMI КАБЕЛЬ QED PREMIUM HDMI Install ${1.0 + index * 0.1}M КАБЕЛЬ HDMI QED`,
  description: `Мощный аудиокабель для идеального звука. Модель ${index + 1}.`,
  price: 32990 + index * 100,
  discountedPrice: Math.round((32990 + index * 100) * 0.9),
  discount: 10,
  image: productImage,
  tags: index % 2 === 0 ? ["NEW"] : ["ХИТ"],
}));

export default products;