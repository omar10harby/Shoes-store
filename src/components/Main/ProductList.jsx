import React from "react";
import { useProduct } from "../../context/ProductContext";
import Product from "./Product";
function ProductList() {
  const { products } = useProduct();
  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product, i) => (
          <Product
            key={i}
            img={product.img}
            title={product.title}
            reviews={product.reviews}
            color={product.color}
            newPrice={product.newPrice}
            prevPrice={product.prevPrice}
          />
        ))}
      </div>
    </div>
  );
}


export default ProductList;
