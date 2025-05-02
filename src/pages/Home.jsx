import React, { useEffect } from 'react';
import ArtistView from '../Component/Author/ArtistView';
import AlbumView from '../Component/Album/AlbumView';
import SongView from '../Component/Song/SongView';
import Footer from '../Component/Footer';

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
  return (
    <div >
      <main className="max-w-7xl mx-auto">
        <ArtistView />

        <AlbumView />

        <SongView />

      </main>
      <Footer/>
    </div>
  );
};

export default Home;
