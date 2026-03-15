import React, { useEffect, useState } from "react";
import { getUser } from "../../../services/apiAuth";
function Logo() {
  return (
    <div className="logo">
      <h3 style={{
        fontWeight: 700,
        fontSize: '1.3rem',
        letterSpacing: '-0.02em',
        color: '#1d1d1f',
        margin: 0,
      }}>
        SHOES<span style={{ fontWeight: 300, color: '#86868b' }}>store</span>
      </h3>
    </div>
  );
}

export default Logo;
