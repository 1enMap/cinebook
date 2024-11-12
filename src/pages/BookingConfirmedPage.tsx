import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Download } from 'lucide-react';
import { format } from 'date-fns';

export function BookingConfirmedPage() {
  const location = useLocation();
  const { showtime, date, movieDetails, selectedSeats, beverages } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-900 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">Your tickets have been booked successfully</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{movieDetails.title}</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{showtime.time}, {format(date, 'dd MMM yyyy')}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="break-words">{showtime.venue}</span>
            </div>
            <div>
              <p className="font-medium mb-1">Seats</p>
              <p className="break-words">{selectedSeats.map(s => s.id).join(', ')}</p>
            </div>
            {beverages && beverages.length > 0 && (
              <div>
                <p className="font-medium mb-1">Food & Beverages</p>
                <ul className="space-y-1">
                  {beverages.map(item => item.quantity > 0 && (
                    <li key={item.id} className="flex justify-between">
                      <span className="truncate mr-2">{item.name}</span>
                      <span className="flex-shrink-0">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 py-3 text-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Book Another Movie
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
}