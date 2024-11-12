import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  genre: string;
  duration: string;
}

export function MovieCard({ id, title, posterUrl, rating, genre, duration }: MovieCardProps) {
  return (
    <Link to={`/movie/${id}`} className="group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="aspect-[2/3] relative">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{rating}/10</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4" />
                <span className="ml-1">{duration} min</span>
              </div>
            </div>
            <p className="text-sm mt-2">{genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}