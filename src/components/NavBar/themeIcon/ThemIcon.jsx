import { Sun } from 'lucide-react'
import React from 'react'
import style from './ThemeIcon.module.css'
function ThemIcon() {
  return (
    <div className={`${style.theme} p-1`}>
            <Sun size={33}/>
    </div>
  )
}

export default ThemIcon
