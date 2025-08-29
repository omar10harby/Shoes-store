import { ShoppingBasket } from "lucide-react";
import React from "react";

function Product({ img, title, reviews, color, prevPrice, newPrice }) {
  return (
    <div className="ProductCard col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={img} alt="product" className="card-img-top img-fluid px-2" style={{ height:"200px", objectFit: "contain" }} />
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="mb-2">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted">{reviews} {color}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              <span className="text-danger me-2" style={{textDecoration:'line-through'}}>{prevPrice}</span>
              <span style={{ color: "greenyellow" }}>${newPrice}</span>
            </p>
            <ShoppingBasket className="basket" strokeWidth={2.25} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
