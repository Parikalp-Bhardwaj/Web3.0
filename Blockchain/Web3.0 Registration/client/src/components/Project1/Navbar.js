import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"

const Navbar = (data) => {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link></li>
                <li>
                    <Link to="/about">About</Link></li>
                <li>
                    <Link to="/contact">Contact</Link></li>
                <div className='acc'>
                    <li>{data.account}</li>
                </div>
            </ul>
        </div>
    )
}

export default Navbar
