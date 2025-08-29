import { ShoppingCart } from 'lucide-react'
import React from 'react'
import style from './CartIcon.module.css'
function CartIcon() {
    const count =2
  return (
        <div className=' position-relative'>
          <ShoppingCart   />
          {
            count>0 && <span className={style.cartBubble}>
                {count}
            </span>
          }
        </div>
  )
}

export default CartIcon
