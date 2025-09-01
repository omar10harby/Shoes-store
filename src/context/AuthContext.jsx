import { createContext, useContext, useEffect, useReducer } from "react";
import {
  getUser,
  login as loginApi,
  Logout as logoutApi,
  SignUp as signUpApi,
} from "../services/apiAuth";
const AuthContext = createContext();

const initalState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "signup/success":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false, 
        user: null, 
        error: null,
      };
    case "user/loaded":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
       case 'signup/success':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false, // مش authenticated
        user: null, // مفيش user محفوظ
        error: null,
      };
    case "user/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "user/logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAuthenticated:false,
        user: null,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ isLoading, isAuthenticated, user, error }, dispatch] = useReducer(
    reducer,
    initalState
  );

    useEffect(() => {
    async function checkAuth() {
      try {
        dispatch({ type: 'loading' });
        const user = await getUser();
        if (user) {
          dispatch({ type: 'user/loaded', payload: user });
        } else {
          dispatch({ type: 'rejected', payload: 'No user found' });
        }
      } catch (err) {
        dispatch({ type: 'rejected', payload: err.message });
      }
    }
    checkAuth();
  }, []);

  async function signUp({ email, password, fullName }) {
    try {
      dispatch({ type: "loading" });
      const data = await signUpApi({ email, password, fullName });
      dispatch({ type: "signup/success" });
      return data
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function login({ email, password }) {
    try {
      dispatch({ type: "loading" });
      const data = await loginApi({ email, password });
      dispatch({ type: "user/login", payload: data.user });
      return data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function logout() {
    try {
        await logoutApi();
        dispatch({type:'user/logout'})
    } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
    }
  }

  return <AuthContext.Provider value={{isLoading,isAuthenticated,user,error,login,logout,signUp}}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
