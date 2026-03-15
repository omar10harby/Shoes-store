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
    <div className="cart-page">
      
      <div className="container py-4">
        {cart.length === 0 ? (
          // Empty Cart
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem', marginBottom: '16px', opacity: 0.2 }}>🛒</div>
            <h2 className="mb-3" style={{ fontWeight: 700 }}>Your Cart is Empty</h2>
            <p className="mb-4" style={{ color: '#86868b' }}>Add some products to your cart to see them here.</p>
            <button 
              className="btn btn-primary px-4 py-2"
              style={{ borderRadius: '10px', fontWeight: 600 }}
              onClick={() => navigate('/app')}
            >
              <ArrowLeft size={18} className="me-2" />
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart with Items
          <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 style={{ fontWeight: 700 }}>Shopping Cart <span style={{ color: '#86868b', fontWeight: 400, fontSize: '1rem' }}>({cart.length} {cart.length === 1 ? 'item' : 'items'})</span></h2>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/app')}
                >
                  <ArrowLeft size={18} className="me-2" />
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
                    <div className="card-body" style={{ padding: '20px' }}>
                      <div className="row align-items-center gap-2 gap-sm-0">
                        {/* Product Image */}
                        <div className="col-12 text-center col-md-2">
                          <div style={{ background: '#fafafa', borderRadius: '12px', padding: '8px' }}>
                            <img 
                              src={item.img} 
                              alt={item.title}
                              className="img-fluid rounded"
                              style={{ height: '80px', objectFit: 'contain' }}
                            />
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="col-md-4">
                          <h6 className="card-title mb-1" style={{ fontWeight: 600 }}>{item.title}</h6>
                          <small style={{ color: '#86868b' }}>
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
                          <div className="d-flex align-items-center justify-content-center" style={{ gap: '8px' }}>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              style={{ borderRadius: '8px', width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              onClick={()=>handleDecreaseQuantity(item.id)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="fw-bold" style={{ minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              style={{ borderRadius: '8px', width: '32px', height: '32px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              onClick={()=>handleIncreaseQuantity(item.id)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total & Remove */}
                        <div className="col-md-2">
                          <div className="text-center">
                            <div className="fw-bold mb-2" style={{ fontSize: '1.05rem' }}>
                              ${(parseFloat(item.newPrice) * item.quantity).toFixed(2)}
                            </div>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              style={{ borderRadius: '8px' }}
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 size={14} />
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
                <div className="card sticky-top" style={{ top: '20px' }}>
                  <div className="card-header">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body" style={{ padding: '24px' }}>
                    <div className="d-flex justify-content-between mb-2" style={{ color: '#555' }}>
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2" style={{ color: '#555' }}>
                      <span>Shipping:</span>
                      <span>$10.00</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2" style={{ color: '#555' }}>
                      <span>Tax:</span>
                      <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <hr style={{ borderColor: '#e0e0e0' }} />
                    <div className="d-flex justify-content-between mb-3">
                      <strong style={{ fontSize: '1.1rem' }}>Total:</strong>
                      <strong style={{ fontSize: '1.1rem' }}>${(cartTotal + 10 + (cartTotal * 0.1)).toFixed(2)}</strong>
                    </div>
                    <button className="btn btn-primary w-100 mb-2 py-2" style={{ fontWeight: 600 }}>
                      Proceed to Checkout
                    </button>
                    <button className="btn btn-outline-secondary w-100 py-2">
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