import React, { useState } from 'react'
import { SignUp } from "../../services/apiAuth.js";
import { useNavigate } from 'react-router-dom';

function Registar() {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  async function handleRegister({ fullName, email, password }) {
    try {
      setIsLoading(true);
      await SignUp({ fullName, email, password });
      console.log("User registered successfully ✅");
      navigate('/')
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({ fullName, email, password });
  }

  return (
    <div className="registar" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container vh-100">
        <div className="row justify-content-center align-items-center h-100">
          <div
            className="col-md-6 p-5 bg-white rounded-2 shadow"
            style={{ border: `2px solid #eee` }}
          >
            <div className="heading text-center mb-2">
              <h3>Registar</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column mb-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  className="px-2 py-1 rounded-2"
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ outline: "none", border: "1px solid #bebaba" }}
                  required
                />
              </div>
              <div className="d-flex flex-column mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="px-2 py-1 rounded-2"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ outline: "none", border: "1px solid #bebaba" }}
                  required
                />
              </div>
              <div className="d-flex flex-column gap-2 mb-3 ">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="px-2 py-1 rounded-2"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ outline: "none", border: "1px solid #bebaba" }}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-1 bg-white rounded-2 "
                  style={{ border: "1px solid #b1a7a7" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registar;
