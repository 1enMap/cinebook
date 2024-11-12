import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, MapPin, CreditCard, Smartphone } from 'lucide-react';
import { format } from 'date-fns';
import { BeverageSelector, type Beverage } from '../components/BeverageSelector';
import { BillSummary } from '../components/BillSummary';

const BEVERAGES: Beverage[] = [
  { id: 'popcorn-l', name: 'Large Popcorn', price: 250, quantity: 0 },
  { id: 'popcorn-m', name: 'Medium Popcorn', price: 200, quantity: 0 },
  { id: 'coke-l', name: 'Large Coke', price: 180, quantity: 0 },
  { id: 'coke-m', name: 'Medium Coke', price: 150, quantity: 0 },
  { id: 'nachos', name: 'Nachos with Cheese', price: 220, quantity: 0 },
  { id: 'combo1', name: 'Popcorn + Coke Combo', price: 350, quantity: 0 },
];

const PLATFORM_FEE = 49;

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: Smartphone },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
];

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showtime, date, movieDetails, selectedSeats, totalAmount } = location.state || {};
  
  const [beverages, setBeverages] = useState<Beverage[]>(BEVERAGES);
  const [selectedPayment, setSelectedPayment] = useState<string>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/booking-confirmed', {
      state: {
        showtime,
        date,
        movieDetails,
        selectedSeats,
        beverages: beverages.filter(b => b.quantity > 0),
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Movie Info */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">{movieDetails.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-300">
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
          <div className="mt-4 text-gray-300">
            <p className="break-words">Selected Seats: {selectedSeats.map(s => s.id).join(', ')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Beverages Selection */}
            <BeverageSelector
              beverages={beverages}
              onUpdate={setBeverages}
            />

            {/* Payment Method Selection */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-colors ${
                      selectedPayment === id
                        ? 'border-red-600 bg-red-600/10 text-white'
                        : 'border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-4">
            <BillSummary
              ticketTotal={totalAmount}
              beverages={beverages}
              platformFee={PLATFORM_FEE}
            />
            
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full mt-6 py-3 sm:py-4 rounded-lg font-bold text-white transition-colors ${
                isProcessing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isProcessing ? 'Processing Payment...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}