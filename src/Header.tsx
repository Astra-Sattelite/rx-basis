import React from 'react';
import { Link } from "react-router-dom"

export const Header = () => {

  const buttons = []
  
  const lazyHeaderStyle: React.CSSProperties = {
    width: "100%",
    height: "50px",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row"
  }

  const lazyHeaderButtonStyle: React.CSSProperties  = {
    height: "90%",
    border: "1px solid black"
  }

  return (
    <div style={lazyHeaderStyle}>
      <Link to="/" style={lazyHeaderButtonStyle}>
        Basis
      </Link>
      <Link to="/pokemon" style={lazyHeaderButtonStyle}>
        Pokemon
      </Link>
    </div>
  )
};
