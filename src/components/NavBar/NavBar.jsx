import React from 'react'
import Logo from './Logo/Logo'
import Search from './Search/Search'
import { ShoppingCart,Sun } from 'lucide-react'
import CartIcon from './CartIcon/CartIcon'
import ThemIcon from './themeIcon/ThemIcon'
import NavBarToggle from "./NavBarToggle";
function NavBar() {
  return (
    <nav className=" py-3  bg-light">
      <div className=" container d-flex flex-nowrap align-items-center justify-content-between">
        <Logo/>
        <div className="d-flex align-items-center gap-4">
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
