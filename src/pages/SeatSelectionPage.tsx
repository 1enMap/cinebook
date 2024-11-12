import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
  status: 'available' | 'taken' | 'selected';
}

const generateSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const seats: Seat[] = [];

  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        price: row < 'D' ? 550 : 450, // Premium rows cost more
        status: Math.random() > 0.8 ? 'taken' : 'available', // Randomly mark some seats as taken
      });
    }
  });

  return seats;
};

export function SeatSelectionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showtime, date, movieDetails } = location.state || {};
  const [seats, setSeats] = useState<Seat[]>(generateSeats());

  const selectedSeats = seats.filter((s) => s.status === 'selected');
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'taken') return;

    const newSeats = seats.map((s) => {
      if (s.id === seat.id) {
        const newStatus = s.status === 'selected' ? 'available' : 'selected';
        return { ...s, status: newStatus };
      }
      return s;
    });

    setSeats(newSeats);
  };

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      navigate('/checkout', {
        state: {
          showtime,
          date,
          movieDetails,
          selectedSeats,
          totalAmount,
        },
      });
    }
  };

  if (!movieDetails || !showtime || !date) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Booking Session</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Movie Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-white mb-4">{movieDetails.title}</h1>
          <div className="flex items-center space-x-4 text-gray-300">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{showtime.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{showtime.venue}</span>
            </div>
            <span>{format(date, 'dd MMM yyyy')}</span>
          </div>
        </div>

        {/* Screen */}
        <div className="relative mb-12">
          <div className="h-2 bg-red-600 rounded-lg mb-2"></div>
          <p className="text-center text-gray-400 text-sm">SCREEN</p>
        </div>

        {/* Seats */}
        <div className="grid grid-cols-12 gap-2 mb-8">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              disabled={seat.status === 'taken'}
              className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                seat.status === 'selected'
                  ? 'bg-red-600 text-white'
                  : seat.status === 'taken'
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              {seat.row}{seat.number}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-600 rounded-md mr-2"></div>
            <span className="text-gray-300">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 rounded-md mr-2"></div>
            <span className="text-gray-300">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-700 rounded-md mr-2"></div>
            <span className="text-gray-300">Taken</span>
          </div>
        </div>

        {/* Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-white">
              <p className="font-medium">Selected Seats: {selectedSeats.map(s => s.id).join(', ')}</p>
              <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
            </div>
            <button
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              className={`px-8 py-3 rounded-lg font-bold transition-colors ${
                selectedSeats.length > 0
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}