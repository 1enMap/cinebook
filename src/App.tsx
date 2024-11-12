import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BookingConfirmedPage } from './pages/BookingConfirmedPage';
import { useAuthStore } from './store/useAuthStore';

export function App() {
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    // Set initial user
    const user = useAuthStore.getState().user;
    setUser(user);
    setIsLoading(false);
  }, [setUser, setIsLoading]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
        </Routes>
      </div>
    </Router>
  );
}