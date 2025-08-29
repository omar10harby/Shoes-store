import React, { useState } from "react";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function Login({email,password}) {
    try {
        setIsLoading(true)
         await login({email,password})
         navigate('/app')
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    Login({email,password})
  }
  return (
    <div className="Login" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container vh-100">
        <div className="row justify-content-center align-items-center h-100">
          <div
            className="col-md-6 p-5  bg-white rounded-2 shadow"
            style={{ border: `2px solid #eee` }}
          >
            <div className="heading text-center mb-2">
              <h3>Login</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="  px-2 py-1 rounded-2"
                  type="text"
                  placeholder="Enter your email"
                  style={{ outline: "none", border: "1px solid #bebaba" }}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex flex-column gap-2 mb-3 ">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="  px-2 py-1 rounded-2"
                  type="text"
                  placeholder="Enter your password"
                  style={{ outline: "none", border: "1px solid #bebaba" }}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="px-4 py-1 bg-white rounded-2 "
                  style={{ border: "1px solid #b1a7a7" }}
                  
                >
                  {isLoading? '....': 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
