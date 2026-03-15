import React from "react";
import { useProduct } from "../../context/ProductContext";
import SideBarFilterGroup from "./SideBarFilterGroup";

function SideBarContent() {
  const { filters, selectedFilter, dispatch } = useProduct();

  return (
    <div className="d-flex flex-column mt-2" style={{ gap: '24px' }}>
      <div className="fliter d-flex flex-column">
        <h5>Category</h5>
        <ul className="p-0 m-0 d-flex flex-column" style={{ gap: '8px' }}>
          {filters.category.map((cat, i) => (
            <li key={i} className="d-flex gap-2 align-items-center">
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
      <div className="fliter d-flex flex-column">
        <h5>Price</h5>
        <ul className="p-0 m-0 d-flex flex-column" style={{ gap: '8px' }}>
          {filters.price.map((price, i) => (
            <li key={i} className="d-flex gap-2 align-items-center">
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
                  ? `$${price.range[0]} – $${price.range[1]}`
                  : price.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="fliter d-flex flex-column">
        <h5>Color</h5>
        <ul className="p-0 m-0 d-flex flex-column" style={{ gap: '8px' }}>
          {filters.color.map((color,i) => (
            <li key={i} className="d-flex gap-2 align-items-center">
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
              <label htmlFor={color} className="d-flex align-items-center gap-2">
                {color !== "All" && (
                  <span style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '1px solid #e0e0e0',
                  }}></span>
                )}
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBarContent;
