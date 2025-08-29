import React from 'react'

function SideBarFilterItem({id, label, name, checked, onChange,key}) {
  return (
        <>
            <li key={key} className="d-flex gap-2">
              <input
                type="radio"
                id={id}
                name={name}
                value={label}
                checked={checked}
                onChange={onChange}
              />
              <label htmlFor={id}>{label}</label>
            </li>
        </>
  )
}

export default SideBarFilterItem
