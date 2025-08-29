import React from "react";
import style from "./Search.module.css";
import { useProduct } from "../../../context/ProductContext";
function Search() {
  const { searchQuery, dispatch } = useProduct();
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchQuery}
      className={`${style.search} d-none d-md-block`}
      onChange={(e)=>{
        dispatch({type:'updateSearchQuery',payload:e.target.value});
        dispatch({type:'applyFilter'});

      }}
    />
  );
}

export default Search;
