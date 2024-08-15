import React from 'react';
import './BookingHistory.css';

const BookingHistory = ({ history = [] }) => {
  return (
    <div className="booking-history">
      <h2>Your Booking History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((booking, index) => (
            <li key={index} className="booking-item">
              {/* Left side: Title and Booking Details */}
              <div className="booking-item-left">
                <h3>{booking.title}</h3>
                <p>Tickets Booked: {booking.tickets}</p>
                <p>Booked Date: {booking.bookedDate}</p>
                <p>Booked Time: {booking.bookedTime}</p>
                {/* <p>Movie Date: {booking.movieDate}</p>
                <p>Movie Time: {booking.movieTime}</p> */}
              </div>

              {/* Right side: Poster */}
              <div className="booking-item-right">
                <img src={booking.poster} alt={booking.title} className="booking-poster" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-bookings">
          <p>No bookings made yet.</p>
        </div>
      )}
    </div>
  );
};
export default BookingHistory;  