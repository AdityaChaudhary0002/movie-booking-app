import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; 
import Profile from './components/Profile';
import Contact from './components/Contact';
import NavigationBar from './components/NavigationBar'; // Import your NavigationBar
import './App.css';
import BookingHistory from './components/BookingHistory';

function App() {
    const [history, setHistory] = useState([]); // Booking history shared between components
    const [isLoggedIn, setIsLoggedIn] = useState(true); // You can manage login state here

    // This function is passed to Home for updating history when a booking is made
    const addToHistory = (newBooking) => {
        setHistory((prevHistory) => [...prevHistory, newBooking]);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Additional logout logic (like clearing tokens, etc.)
    };

    return (
        <Router>
            <NavigationBar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Always render the NavigationBar */}
            <div className="content"> {/* Optional: Add some styling for spacing */}
                <Routes>
                    <Route path="/" element={<Home addToHistory={addToHistory} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/booking-history" element={<BookingHistory history={history} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
