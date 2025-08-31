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
import Spinner from "./components/Spinner";
import Cart from "./components/Cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <div className="container-fluid  px-0 ">
        <AuthProvider>
          <ProductProvider>
            <BrowserRouter>
              <Routes>
                <Route index={true} element={<Login />} />
                <Route path="registar" element={<Registar />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <LayOut />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
            <Toaster gutter={12} />
          </ProductProvider>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
