import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Registar() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const watchPassword = watch("password");

  const onSubmit = async ({fullName,email,password}) => {
    try {
      await signUp({fullName, email, password});
      toast.success("Account created successfully! Please login.");
      navigate('/'); 
      reset(); 
    } catch (error) {
      toast.error( "Registration failed");
    }
  };

  return (
    <div className="registar" >
      <div className="container vh-100">
        <div className="row justify-content-center align-items-center h-100">
          <div
            className="col-md-6  p-4 p-sm-5 bg-white rounded-2 "
            style={{ border: `2px solid #eee` ,boxShadow:'0px 0px 4px 0px rgb(0 0 0 / 10%)'}}
          >
            <div className="heading text-center mb-2">
              <h3>Create Account</h3>
              <p className="text-muted">Join us to start shopping</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name Field */}
              <div className="d-flex flex-column mb-2">
                <label htmlFor="fullName" className="mb-1">Full Name</label>
                <input
                  id="fullName"
                  className={`px-3 py-2 rounded-2 ${errors.fullName ? 'border-danger' : ''}`}
                  type="text"
                  placeholder="Enter your full name"
                  style={{ 
                    outline: "none", 
                    border: errors.fullName ? "1px solid #dc3545" : "1px solid #bebaba" 
                  }}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters"
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Full name should contain only letters and spaces"
                    }
                  })}
                />
                {errors.fullName && (
                  <small className="text-danger mt-1">{errors.fullName.message}</small>
                )}
              </div>

              {/* Email Field */}
              <div className="d-flex flex-column mb-2">
                <label htmlFor="email" className="mb-1">Email</label>
                <input
                  id="email"
                  className={`px-3 py-2 rounded-2 ${errors.email ? 'border-danger' : ''}`}
                  type="email"
                  placeholder="Enter your email"
                  style={{ 
                    outline: "none", 
                    border: errors.email ? "1px solid #dc3545" : "1px solid #bebaba" 
                  }}
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
              <div className="d-flex flex-column mb-2">
                <label htmlFor="password" className="mb-1">Password</label>
                <input
                  id="password"
                  className={`px-3 py-2 rounded-2 ${errors.password ? 'border-danger' : ''}`}
                  type="password"
                  placeholder="Enter your password"
                  style={{ 
                    outline: "none", 
                    border: errors.password ? "1px solid #dc3545" : "1px solid #bebaba" 
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                    }
                  })}
                />
                {errors.password && (
                  <small className="text-danger mt-1">{errors.password.message}</small>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="d-flex flex-column mb-3">
                <label htmlFor="confirmPassword" className="mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  className={`px-3 py-2 rounded-2 ${errors.confirmPassword ? 'border-danger' : ''}`}
                  type="password"
                  placeholder="Confirm your password"
                  style={{ 
                    outline: "none", 
                    border: errors.confirmPassword ? "1px solid #dc3545" : "1px solid #bebaba" 
                  }}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value =>
                      value === watchPassword || "Passwords don't match"
                  })}
                />
                {errors.confirmPassword && (
                  <small className="text-danger mt-1">{errors.confirmPassword.message}</small>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 w-100"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={() => navigate('/')}
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registar;