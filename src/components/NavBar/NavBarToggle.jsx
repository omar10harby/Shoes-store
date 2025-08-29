import { Menu, X } from 'lucide-react'
import React from 'react'
import { useProduct } from '../../context/ProductContext'

function NavBarToggle() {
    const{isSideBarOpen,dispatch}=useProduct()
  return (
    <div className=' d-md-none' style={{cursor:'pointer'}} onClick={()=>dispatch({type:'toggleSideBar'})}>
            {isSideBarOpen? "":<Menu size={30}/> }
    </div>
  )
}

export default NavBarToggle
