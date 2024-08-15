import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MoviesList.css';

const MoviesList = ({ movies, bookTicket, cancelBooking }) => {
  const [bookedMovies, setBookedMovies] = useState({});
  const [selectedTickets, setSelectedTickets] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState({});

  const handleTicketChange = (movieId, increment) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [movieId]: Math.max(1, (prev[movieId] || 1) + increment),
    }));
  };

  const handleBooking = (movie) => {
    const ticketsToBook = selectedTickets[movie.id] || 1;
    const dateSelected = selectedDate[movie.id];
    const timeSelected = selectedTime[movie.id];

    // Validation for date and time selection
    if (!dateSelected || !timeSelected) {
      toast.error("Please select a date and time before booking.", { theme: 'dark' });
      return;
    }

    if (movie.availableTickets >= ticketsToBook) {
      setBookedMovies((prev) => ({
        ...prev,
        [movie.id]: {
          ...movie,
          bookedAt: new Date(),
          ticketsBooked: ticketsToBook,
        },
      }));
      bookTicket(movie.id, ticketsToBook);
      toast.success(`${ticketsToBook} ticket(s) booked successfully! Cancel within 10 minutes.`, { theme: 'dark' });
    } else {
      toast.error(`Not enough available tickets. Only ${movie.availableTickets} left.`, { theme: 'dark' });
    }
  };

  const handleCancel = (movieId) => {
    const confirmation = window.confirm("Are you sure you want to cancel the booking?");
    if (confirmation) {
      setBookedMovies((prev) => {
        const updatedMovies = { ...prev };
        const bookedMovie = updatedMovies[movieId];

        if (bookedMovie) {
          const now = new Date();
          const bookedTime = new Date(bookedMovie.bookedAt);
          const timeDiff = (now - bookedTime) / 1000 / 60;

          if (timeDiff <= 10) {
            delete updatedMovies[movieId];
            cancelBooking(movieId, bookedMovie.ticketsBooked);
            toast.success("Booking canceled successfully.", { theme: 'dark' });
          } else {
            toast.error("You can no longer cancel this booking.", { theme: 'dark' });
          }
        }
        return updatedMovies;
      });
    }
  };

  // Function to generate the next 14 days of dates
  const generateDates = () => {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      return nextDate.toLocaleDateString(); // Format the date as needed
    });
  };

  const availableDates = generateDates();
  const availableTimes = ["9-12", "12-3", "3-6", "6-9", "9-12"];

  return (
    <div className="movie-list">
      <ToastContainer />
      {movies.map((movie) => (
        <div
          className={`movie-card ${movie.availableTickets === 0 ? 'no-hover faded-overlay' : ''}`}
          key={movie.id}
        >
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <h3 className="movie-title">{movie.title}</h3>
          <p className="available-tickets">Available Tickets: {movie.availableTickets}</p>

          {/* Date Dropdown */}
          <select 
            value={selectedDate[movie.id] || ''} 
            onChange={(e) => setSelectedDate({ ...selectedDate, [movie.id]: e.target.value })}
            className="dropdown"
          >
            <option value="">Select Date</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>

          {/* Time Dropdown */}
          <select 
            value={selectedTime[movie.id] || ''} 
            onChange={(e) => setSelectedTime({ ...selectedTime, [movie.id]: e.target.value })}
            className="dropdown"
          >
            <option value="">Select Time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {movie.availableTickets > 0 ? (
            !bookedMovies[movie.id] ? (
              <div className="ticket-selection">
                <button
                  onClick={() => handleTicketChange(movie.id, -1)}
                  disabled={(selectedTickets[movie.id] || 1) <= 1}
                >
                  -
                </button>
                <span>{selectedTickets[movie.id] || 1}</span>
                <button
                  onClick={() => handleTicketChange(movie.id, 1)}
                  disabled={(selectedTickets[movie.id] || 1) >= movie.availableTickets}
                >
                  +
                </button>
                <button className="button" onClick={() => handleBooking(movie)}>
                  Book Ticket
                </button>
              </div>
            ) : (
              <button className="button" onClick={() => handleCancel(movie.id)}>
                Cancel Booking
              </button>
            )
          ) : (
            <>
              <button className="unavailable-btn" disabled>
                Unavailable
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
