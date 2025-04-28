import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Component/Navbar';
import ArtistView from '../Component/Author/ArtistView';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 text-center mt-10 text-lg font-semibold">
          Oops! Something went wrong in the artist section.
        </div>
      );
    }

    return this.props.children;
  }
}

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sonique/user/login');
    }
  }, [navigate]);

  const handleCardClick = (artist) => {
    console.log('Artist clicked:', artist);
  };

  const setViewAllSection = (section) => {
    console.log('View all section:', section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-white">
      <NavBar />
      <main className="max-w-7xl mx-auto py-10">
        <ErrorBoundary>
          <ArtistView
            handleCardClick={handleCardClick}
            setViewAllSection={setViewAllSection}
          />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Home;
