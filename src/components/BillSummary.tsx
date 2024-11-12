import React from 'react';
import type { Beverage } from './BeverageSelector';

interface BillSummaryProps {
  ticketTotal: number;
  beverages: Beverage[];
  platformFee: number;
}

export function BillSummary({ ticketTotal, beverages, platformFee }: BillSummaryProps) {
  const beverageTotal = beverages.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = ticketTotal + beverageTotal + platformFee;
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  const formatPrice = (price: number) => `₹${price.toFixed(2)}`;

  return (
    <div className="space-y-4 bg-gray-800 p-4 sm:p-6 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Bill Summary</h3>
      
      <div className="space-y-2 pb-4 border-b border-gray-700">
        <div className="flex justify-between text-gray-300">
          <span>Tickets Subtotal</span>
          <span>{formatPrice(ticketTotal)}</span>
        </div>
        
        {beverages.map(item => item.quantity > 0 && (
          <div key={item.id} className="flex justify-between text-gray-300">
            <span className="truncate mr-2">{item.name} x{item.quantity}</span>
            <span className="flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        
        <div className="flex justify-between text-gray-300">
          <span>Platform Fee</span>
          <span>{formatPrice(platformFee)}</span>
        </div>
      </div>

      <div className="space-y-2 pb-4 border-b border-gray-700">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>GST (18%)</span>
          <span>{formatPrice(gst)}</span>
        </div>
      </div>

      <div className="flex justify-between text-white font-bold">
        <span>Total Amount</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}