import "./logo.css"
import logo from "../../assets/imgs/logo1.png"
import React from 'react'

export default props =>
    <aside className="logo">
        <a href="/" className="logo">
            <img src={logo} alt="logo" />
        </a>
    </aside>