import React from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";
import { useProduct } from "../context/ProductContext";
import Main from "./Main/Main";
function LayOut() {
  const { isOpen } = useProduct();
  return (
    <>
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <NavBar />
        <div className="d-flex flex-grow-1 overflow-hidden">
          <SideBar />
          <div className="main flex-grow-1 overflow-auto px-3">
            <Main />
          </div>
        </div>
      </div>
    </>
  );
}

export default LayOut;
