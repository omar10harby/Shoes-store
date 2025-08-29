import React from "react";
import { useProduct } from "../../context/ProductContext";
import SideBarFilterGroup from "./SideBarFilterGroup";

function SideBarContent() {
  const { filters, selectedFilter, dispatch } = useProduct();

  return (
    <div className="d-flex flex-column align-items-center mt-2">
      <div className="fliter d-flex flex-column align-items-center">
        <h5>Category</h5>
        <ul className="p-0 m-0">
          {filters.category.map((cat, i) => (
            <li key={i} className="d-flex gap-2">
              <input
                type="radio"
                id={cat}
                name="category"
                value={cat}
                checked={selectedFilter.category === cat}
                onChange={(e) => {
                  dispatch({
                    type: "updateFilter",
                    payload: { name: "category", value: e.target.value },
                  });
                    dispatch({ type: "applyFilter" });
                }}
              />
              <label htmlFor={cat}>{cat}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="fliter d-flex flex-column align-items-center my-2">
        <h5>Price</h5>
        <ul className="p-0 m-0">
          {filters.price.map((price, i) => (
            <li key={i} className="d-flex gap-2">
              <input
                type="radio"
                id={price.label}
                name="price"
                value={price.label}
                checked={selectedFilter.price === price.label}
                onChange={(e) => {
                  dispatch({
                    type: "updateFilter",
                    payload: {
                      name: "price",
                      value: e.target.value,
                    },
                  });
                  dispatch({ type: "applyFilter" });
                }}
              />
              <label htmlFor={price.label}>
                {price.range
                  ? `${price.range[0]} - ${price.range[1]}`
                  : price.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="fliter d-flex flex-column align-items-center my-2">
        <h5>Color</h5>
        <ul className="p-0 m-0">
          {filters.color.map((color,i) => (
            <li key={i} className="d-flex gap-2">
              <input
                type="radio"
                id={color}
                name="color"
                value={color}
                checked={selectedFilter.color===color}
                onChange={(e) => {
                  dispatch({type:'updateFilter',payload:{name:"color",value:e.target.value}}),
                  dispatch({type:'applyFilter'})
                }}
                  style={{accentColor:`${color}`}}
                />
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBarContent;
