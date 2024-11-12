import React from 'react';
import { Plus, Minus } from 'lucide-react';

export interface Beverage {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BeverageSelectorProps {
  beverages: Beverage[];
  onUpdate: (beverages: Beverage[]) => void;
}

export function BeverageSelector({ beverages, onUpdate }: BeverageSelectorProps) {
  const updateQuantity = (id: string, delta: number) => {
    const updated = beverages.map(beverage => {
      if (beverage.id === id) {
        const newQuantity = Math.max(0, beverage.quantity + delta);
        return { ...beverage, quantity: newQuantity };
      }
      return beverage;
    });
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Add Beverages</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {beverages.map((beverage) => (
          <div key={beverage.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
            <div className="min-w-0 flex-1">
              <p className="text-white font-medium truncate">{beverage.name}</p>
              <p className="text-gray-400">₹{beverage.price}</p>
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => updateQuantity(beverage.id, -1)}
                className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={beverage.quantity === 0}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white w-8 text-center">{beverage.quantity}</span>
              <button
                onClick={() => updateQuantity(beverage.id, 1)}
                className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}