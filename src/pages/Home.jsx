import React, { useEffect } from 'react';
import ArtistView from '../Component/Author/ArtistView';
import AlbumView from '../Component/Album/AlbumView';
import SongView from '../Component/Song/SongView';
import Footer from '../Component/Footer';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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

  const handleNavigate = () => {
    navigate('/sonique/liked-songs');
  };

  return (
    <div className="relative">
      <main className="max-w-7xl mx-auto">
        <ErrorBoundary>
          <ArtistView />
        </ErrorBoundary>

        <AlbumView />

        <SongView />
      </main>

      <Footer />

      {/* Favorite Icon Fixed Bottom-Right with label on left side */}
      <div className="fixed bottom-6 right-6 z-40 group flex items-center space-x-2">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-gray-800 text-white px-2 py-1 rounded shadow-md mr-2">
          Favorite
        </div>
        <button
          className="p-3 rounded-full shadow-lg transition duration-300 ease-in-out group-hover:brightness-90"
          onClick={handleNavigate}
          style={{ backgroundColor: '#5d847c' }}
          title="Favorite"
        >
          <AiFillHeart size={28} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

export default Home;
