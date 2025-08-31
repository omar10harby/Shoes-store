import { ShoppingCart } from 'lucide-react'
import React from 'react'
import style from './CartIcon.module.css'
import { useProduct } from '../../../context/ProductContext'
import { useNavigate } from 'react-router-dom'
function CartIcon() {
  const navigate=useNavigate()
  const {cartItemsCount}=useProduct()
  return (
        <div className=' position-relative'style={{cursor:'pointer'}} onClick={()=>navigate('/cart')}>
          <ShoppingCart   />
          {
            cartItemsCount>0 && <span className={style.cartBubble}>
                {cartItemsCount}
            </span>
          }
        </div>
  )
}

export default CartIcon
