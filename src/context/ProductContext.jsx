import React, { createContext, useContext, useReducer } from "react";
import data from "../data/data";

const ProductContext = createContext();

// ===== price filter building =====
const rawPrices = [...new Set(data.map((item) => item.newPrice))].sort(
  (a, b) => a - b
);

const priceFilters = [{ label: "All", range: null }];
for (let i = 0; i < rawPrices.length; i++) {
  const price = rawPrices[i];
  const prev = i === 0 ? 0 : rawPrices[i - 1];
  priceFilters.push({
    label: String(price),
    range: [prev, price],
  });
}

// ===== initial state =====
const initialState = {
  products: data,
  allProducts: data,
  filters: {
    category: ["All", ...new Set(data.map((item) => item.category))],
    color: ["All", ...new Set(data.map((item) => item.color))],
    brand: ["All Products", ...new Set(data.map((item) => item.company))],
    price: priceFilters,
  },
  selectedFilter: {
    category: "All",
    color: "All",
    brand: "All Products",
    price: "All",
  },
  isSideBarOpen: false,
  searchQuery: "",
  cart:[]
};

// ===== reducer =====
function reduce(state, action) {
  switch (action.type) {
    case "toggleSideBar":
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen,
      };
    case "updateFilter":
      return {
        ...state,
        selectedFilter: {
          ...state.selectedFilter,
          [action.payload.name]: action.payload.value,
          ...(action.payload.name === "price" && {
            priceRange: action.payload.range,
          }),
        },
      };
    case "updateSearchQuery":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "applyFilter": {
      const { allProducts, selectedFilter, searchQuery } = state;
      let filtered = [...allProducts];
      if (selectedFilter.category !== "All") {
        filtered = filtered.filter(
          (item) => item.category === selectedFilter.category
        );
      }
      if (selectedFilter.price !== "All") {
        filtered = filtered.filter(
          (item) => item.newPrice === selectedFilter.price
        );
      }
      if (selectedFilter.color !== "All") {
        filtered = filtered.filter(
          (item) => item.color === selectedFilter.color
        );
      }
      if (selectedFilter.brand !== "All Products") {
        filtered = filtered.filter(
          (item) => item.company === selectedFilter.brand
        );
      }
      if (searchQuery !== "") {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(searchQuery)
        );
      }
      return {
        ...state,
        products: filtered,
      };
    }

    //cart actions
    case "cart/addItem": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, quantity: 1 },
        ],
      };
    }
    case "cart/removeItem":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "cart/increaseQuantity":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "cart/decreaseQuantity":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'cart/clearCart':return{
      ...state,
      cart:[]
    }
    default:
      throw new Error("unknown action");
  }
}

// ===== provider =====
function ProductProvider({ children }) {
  const [
    { products, filters, isSideBarOpen, selectedFilter, searchQuery ,cart},
    dispatch,
  ] = useReducer(reduce, initialState);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.newPrice) * item.quantity), 0);

  return (
    <ProductContext.Provider
      value={{
        isSideBarOpen,
        products,
        selectedFilter,
        filters,
        searchQuery,
        cart,
        cartItemsCount,
        cartTotal,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) throw new Error("context errrroooorrrrr");
  return context;
}

export { ProductProvider, useProduct };
