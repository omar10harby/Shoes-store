import React from "react";
import { useProduct } from "../../context/ProductContext";

function MainFilter() {
  const { filters, selectedFilter, dispatch } = useProduct();

  return (
    <div className="d-flex justify-content-center justify-content-md-start  align-items-center gap-3">
      {filters.brand.map((brand) => (
        <button
          className={`btn-brand ${selectedFilter.brand===brand? "active":''}`}
          onClick={() =>{
            dispatch({
              type: "updateFilter",
              payload: { name: "brand", value: brand },
            });
            dispatch({type:'applyFilter'})
          }
          }
        >
          {brand}
        </button>
      ))}
    </div>
  );
}

export default MainFilter;
