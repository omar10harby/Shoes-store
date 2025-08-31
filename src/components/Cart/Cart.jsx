import React from 'react';
import { useProduct } from '../../context/ProductContext';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, cartTotal, dispatch } = useProduct();
  const navigate = useNavigate();


  function handleIncreaseQuantity(id){
    dispatch({type:'cart/increaseQuantity',payload:id})
  }
  function handleDecreaseQuantity(id){
    dispatch({type:'cart/decreaseQuantity',payload:id})
  }
  function handleRemoveItem(id){
    dispatch({ type: 'cart/removeItem', payload: id });
  };

  function handleClearCart() {
    dispatch({ type: 'cart/clearCart' });
  };

  return (
    <div style={{ minHeight: "100vh"}}>
      
      <div className="container py-4">
        {cart.length === 0 ? (
          // Empty Cart
          <div className="text-center py-5">
            <h2 className="mb-4">Your Cart is Empty</h2>
            <p className="text-muted mb-4">Add some products to your cart to see them here.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/app')}
            >
              <ArrowLeft size={20} className="me-2" />
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart with Items
          <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Shopping Cart ({cart.length} items)</h2>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/app')}
                >
                  <ArrowLeft size={20} className="me-2" />
                  Continue Shopping
                </button>
                <button 
                  className="btn btn-outline-danger"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="row">
              {/* Cart Items */}
              <div className="col-lg-8 ">
                {cart.map((item) => (
                  <div key={item.id} className="card mb-3">
                    <div className="card-body">
                      <div className="row align-items-center gap-2 gap-sm-0">
                        {/* Product Image */}
                        <div className="col-12 text-center col-md-2">
                          <img 
                            src={item.img} 
                            alt={item.title}
                            className="img-fluid rounded"
                            style={{ height: '80px', objectFit: 'contain' }}
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="col-md-4">
                          <h6 className="card-title mb-1">{item.title}</h6>
                          <small className="text-muted">
                            {item.company} • {item.color} • {item.category}
                          </small>
                        </div>
                        
                        {/* Price */}
                        <div className="col-md-2">
                          <div className="text-center">
                            <span className="fw-bold">${item.newPrice}</span>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="col-md-2">
                          <div className="d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={()=>handleDecreaseQuantity(item.id)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={()=>handleIncreaseQuantity(item.id)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total & Remove */}
                        <div className="col-md-2">
                          <div className="text-center">
                            <div className="fw-bold mb-2">
                              ${(parseFloat(item.newPrice) * item.quantity).toFixed(2)}
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="col-lg-4">
                <div className="card sticky-top">
                  <div className="card-header">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span>$10.00</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax:</span>
                      <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total:</strong>
                      <strong>${(cartTotal + 10 + (cartTotal * 0.1)).toFixed(2)}</strong>
                    </div>
                    <button className="btn btn-primary w-100 mb-2">
                      Proceed to Checkout
                    </button>
                    <button className="btn btn-outline-secondary w-100">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;