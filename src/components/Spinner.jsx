import React from 'react'
import { PacmanLoader } from 'react-spinners'

function Spinner() {
  return (
    <div className='vh-100  d-flex align-items-center justify-content-center'>
      <PacmanLoader color='#ddd' size={30}/>
    </div>
  )
}

export default Spinner
