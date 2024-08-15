import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // You can create a CSS file for styles

function NavigationBar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar">
            <h1 className="app-title">MovieNest</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="./booking-history">Booking History</Link></li>
                <li><Link to="./profile">Profile</Link></li>
                <li><Link to="./contact">Contact</Link></li>
                <li>
                    {isLoggedIn ? (
                        <span onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</span>
                    ) : (
                        <Link to="./login">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;