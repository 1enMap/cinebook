import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Star, MapPin } from 'lucide-react';
import { format, addDays } from 'date-fns';

const MOVIES = {
  '1': {
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
  '2': {
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
  '3': {
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
};

const VENUES = [
  'IMAX - Malad',
  'IMAX - BKC',
  'PVR - Phoenix',
  'Cinepolis - Andheri',
  'IMAX - Lower Parel',
];

const POSSIBLE_TIMES = [
  '09:00', '10:30', '11:45',
  '13:15', '14:30', '15:45',
  '16:30', '17:45', '19:00',
  '20:15', '21:30', '22:45'
];

const generateShowtimes = (date: Date) => {
  // Use the date's day as a seed for "randomization"
  const day = date.getDate();
  const showtimes = [];
  
  // Generate 3-5 showtimes per venue based on the date
  VENUES.forEach((venue) => {
    const numShowtimes = 3 + (day % 3); // 3-5 showtimes
    const venueShowtimes = new Set<string>();
    
    // Use the venue index and date to pick different times
    while (venueShowtimes.size < numShowtimes) {
      const timeIndex = (day + venueShowtimes.size) % POSSIBLE_TIMES.length;
      venueShowtimes.add(POSSIBLE_TIMES[timeIndex]);
    }

    // Convert to array and sort
    const times = Array.from(venueShowtimes).sort();
    
    // Generate prices based on time (evening shows cost more)
    times.forEach(time => {
      const hour = parseInt(time.split(':')[0]);
      const basePrice = venue.includes('IMAX') ? 450 : 280;
      const eveningPrice = hour >= 17 ? 70 : 0;
      const weekendPrice = [0, 6].includes(date.getDay()) ? 100 : 0;
      
      showtimes.push({
        id: `${venue}-${time}-${date.getTime()}`,
        time,
        venue,
        price: basePrice + eveningPrice + weekendPrice
      });
    });
  });

  return showtimes.sort((a, b) => {
    const timeA = parseInt(a.time.replace(':', ''));
    const timeB = parseInt(b.time.replace(':', ''));
    return timeA - timeB;
  });
};

export function MovieDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  const movieDetails = MOVIES[id as keyof typeof MOVIES];

  if (!movieDetails) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
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

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  // Generate showtimes based on selected date
  const showtimes = useMemo(() => generateShowtimes(selectedDate), [selectedDate]);

  const handleProceed = () => {
    if (selectedShowtime) {
      const showtime = showtimes.find(s => s.id === selectedShowtime);
      navigate(`/movie/${id}/seats`, { 
        state: { 
          showtime,
          date: selectedDate,
          movieDetails
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-12">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={movieDetails.posterUrl}
          alt={movieDetails.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movieDetails.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-200 mb-4">
              <span className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                {movieDetails.rating}/10
              </span>
              <span>|</span>
              <span>{movieDetails.genre}</span>
              <span>|</span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {movieDetails.duration} min
              </span>
            </div>
            <p className="text-lg text-gray-300">{movieDetails.description}</p>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Select Show Date</h2>
          
          {/* Date Selection */}
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
            {dates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedShowtime(null);
                }}
                className={`flex flex-col items-center min-w-[100px] p-4 rounded-lg transition-colors ${
                  selectedDate.toDateString() === date.toDateString()
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="text-sm">{format(date, 'EEE')}</span>
                <span className="text-xl font-bold">{format(date, 'd')}</span>
                <span className="text-sm">{format(date, 'MMM')}</span>
              </button>
            ))}
          </div>

          {/* Showtimes */}
          <h2 className="text-2xl font-bold text-white mb-6">Select Showtime</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showtimes.map((showtime) => (
              <button
                key={showtime.id}
                onClick={() => setSelectedShowtime(showtime.id)}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  selectedShowtime === showtime.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5" />
                  <div>
                    <p className="font-bold">{showtime.time}</p>
                    <p className="text-sm flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {showtime.venue}
                    </p>
                  </div>
                </div>
                <span className="font-bold">₹{showtime.price}</span>
              </button>
            ))}
          </div>

          {/* Proceed Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleProceed}
              disabled={!selectedShowtime}
              className={`px-8 py-3 rounded-lg font-bold transition-colors ${
                selectedShowtime
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Seat Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}