import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async ({email,password}) => {
    try {
      await login({email, password});
      toast.success("Login successful!");
      navigate('/app');
      reset();
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="heading text-center mb-4">
          <h3 style={{ marginBottom: '4px' }}>Welcome Back</h3>
          <p className="text-muted">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="d-flex flex-column mb-3">
            <label htmlFor="email" className="mb-2">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              style={errors.email ? { borderColor: '#dc3545' } : {}}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <small className="text-danger mt-1">{errors.email.message}</small>
            )}
          </div>

          {/* Password Field */}
          <div className="d-flex flex-column mb-4">
            <label htmlFor="password" className="mb-2">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              style={errors.password ? { borderColor: '#dc3545' } : {}}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <small className="text-danger mt-1">{errors.password.message}</small>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mb-3">
            <button
              disabled={isLoading || isSubmitting}
              type="submit"
              className="btn btn-primary px-4 py-2 w-100"
            >
              {isLoading || isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="mb-0" style={{ fontSize: '0.9rem', color: '#86868b' }}>
              Don't have an account?{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => navigate('/registar')}
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;