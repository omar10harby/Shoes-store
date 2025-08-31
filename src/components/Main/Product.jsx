import { ShoppingBasket } from "lucide-react";
import React from "react";
import { useProduct } from "../../context/ProductContext";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";

function Product({ img, title, reviews, color, prevPrice, newPrice }) {
  const { cart, dispatch } = useProduct();
  function handleAddToCart() {
    const product = {
      id: Date.now(),
      img,
      title,
      color,
      newPrice,
    };
    dispatch({ type: "cart/addItem", payload: product });
    toast.success(`${title} successfully added to the cart`);
  }
  function handleRemoveFromCart(id) {
    dispatch({ type: "cart/removeItem", payload: id });
    toast.success(`${title} successfully removed to the cart`);
  }
  return (
    <div className="ProductCard col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={img}
          alt="product"
          className="card-img-top img-fluid px-2"
          style={{ height: "200px", objectFit: "contain" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="mb-2">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted">
              {reviews} {color}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              <span
                className="text-danger me-2"
                style={{ textDecoration: "line-through" }}
              >
                {prevPrice}
              </span>
              <span style={{ color: "greenyellow" }}>${newPrice}</span>
            </p>
            {cart.find((item) => item.title === title) ? (
              <HiTrash onClick={() => handleRemoveFromCart(cart.find((item)=>item.title === title).id)} strokeWidth={2.25}/>
            ) : (
              <ShoppingBasket
                onClick={handleAddToCart}
                className="basket"
                strokeWidth={2.25}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
