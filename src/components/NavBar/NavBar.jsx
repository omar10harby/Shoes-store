import React from 'react'
import Logo from './Logo/Logo'
import Search from './Search/Search'
import { ShoppingCart,Sun } from 'lucide-react'
import CartIcon from './CartIcon/CartIcon'
import ThemIcon from './themeIcon/ThemIcon'
import NavBarToggle from "./NavBarToggle";
function NavBar() {
  return (
    <nav style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      padding: '12px 0',
    }}>
      <div className=" container d-flex flex-nowrap align-items-center justify-content-between">
        <Logo/>
        <div className="d-flex align-items-center gap-3">
          <Search/>
          <ThemIcon/>
          <CartIcon/>
          <NavBarToggle/>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
