import React from 'react';
import { MovieCard } from '../components/MovieCard';

const FEATURED_MOVIES = [
  {
    id: '1',
    title: 'Jawaan',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg',
    rating: 8.2,
    genre: 'Action/Thriller',
    duration: '169',
    description: 'A high-octane action thriller that follows a man driven by a personal vendetta to rectify the wrongs in society.',
    director: 'Atlee',
    cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi']
  },
  {
    id: '2',
    title: 'Pathaan',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDdkNTY1MDQtY2I5MC00OTFlLTg5OWQtZWE2YzE5NWFiMDgzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    rating: 8.4,
    genre: 'Action/Spy',
    duration: '146',
    description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
    director: 'Siddharth Anand',
    cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham']
  },
  {
    id: '3',
    title: 'Dunki',
    posterUrl: 'https://m.media-amazon.com/images/I/91zOCNs+x-L.jpg',
    rating: 7.8,
    genre: 'Comedy/Drama',
    duration: '161',
    description: 'A heartwarming tale about friends who embark on a journey to foreign lands through an unconventional route.',
    director: 'Rajkumar Hirani',
    cast: ['Shah Rukh Khan', 'Taapsee Pannu', 'Vicky Kaushal']
  }
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src={FEATURED_MOVIES[0].posterUrl}
          alt="Hero"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Book Your Cinema Experience
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Get the best seats for the latest Bollywood blockbusters at your favorite theaters
            </p>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Now Showing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {FEATURED_MOVIES.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}