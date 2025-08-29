import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

import { ProductProvider } from "./context/ProductContext";
import LayOut from "./components/LayOut";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registar from "./components/Auth/Registar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="container-fluid px-0 ">
        <ProductProvider>
          <BrowserRouter>
             <Routes>
                <Route index={true} element={<Login/>}/>
                <Route path="/registar" element={<Registar/>}/>
                <Route path="/app" element={<LayOut/>}/>
             </Routes>
          </BrowserRouter>
           <Toaster gutter={12}/>
        </ProductProvider>
      </div>
    </>
  );
}

export default App;
