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
      <div className="card h-100">
        <div style={{ background: '#fafafa', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={img}
            alt="product"
            className="img-fluid"
            style={{ height: "180px", objectFit: "contain" }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between" style={{ padding: '16px 20px' }}>
          <div className="mb-2">
            <h5 className="card-title" style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>{title}</h5>
            <p className="card-text" style={{ fontSize: '0.8rem', color: '#86868b', marginBottom: 0 }}>
              {reviews}
              {color && (
                <span className="ms-2 d-inline-flex align-items-center gap-1">
                  <span style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '1px solid #ddd',
                  }}></span>
                  {color}
                </span>
              )}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="mb-0">
              <span
                className="me-2"
                style={{ textDecoration: "line-through", color: '#aaa', fontSize: '0.85rem' }}
              >
                {prevPrice}
              </span>
              <span style={{ color: '#1d1d1f', fontWeight: 700, fontSize: '1.05rem' }}>${newPrice}</span>
            </p>
            {cart.find((item) => item.title === title) ? (
              <HiTrash
                onClick={() => handleRemoveFromCart(cart.find((item)=>item.title === title).id)}
                strokeWidth={2.25}
                style={{ cursor: 'pointer', color: '#dc3545', fontSize: '1.3rem' }}
              />
            ) : (
              <ShoppingBasket
                onClick={handleAddToCart}
                className="basket"
                strokeWidth={2.25}
                size={20}
                style={{ cursor: 'pointer', color: '#555', transition: 'color 0.2s ease' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
