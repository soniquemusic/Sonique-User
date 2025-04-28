// ArtistPlaylist.js - Spotify-style player component
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { formatTime } from '../utils';
import Navbar from '../Navbar';

const ArtistPlaylist = ({ artist, onClose }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80); // Default volume
  const audioRef = useRef(null);

  const setupAudio = useCallback(() => {
    if (!artist?.songs?.length) return;

    audioRef.current = new Audio(artist.songs[currentTrackIndex].audio_url);
    audioRef.current.preload = "metadata";
    audioRef.current.volume = volume / 100;

    audioRef.current.onended = () => {
      handleNext();
    };

    audioRef.current.ontimeupdate = () => {
      if (audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [artist, currentTrackIndex]);

  const togglePlayPause = useCallback(() => {
    if (!artist?.songs?.length) return;

    if (!audioRef.current) {
      setupAudio();
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, setupAudio]);

  const handleTrackSelect = useCallback((index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = artist.songs[index].audio_url;
      audioRef.current.currentTime = 0;
      audioRef.current.volume = volume / 100; // Set volume for new track
    }

    setTimeout(() => {
      setIsPlaying(true);
      audioRef.current?.play().catch(e => console.error("Playback error:", e));
    }, 100);
  }, [artist, volume]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % artist.songs.length;
    handleTrackSelect(nextIndex);
  }, [currentTrackIndex, artist, handleTrackSelect]);

  const handlePrevious = useCallback(() => {
    if (audioRef.current?.currentTime > 3) {
      // If more than 3 seconds into song, restart current track
      audioRef.current.currentTime = 0;
    } else {
      // Otherwise go to previous track
      const prevIndex = (currentTrackIndex - 1 + artist.songs.length) % artist.songs.length;
      handleTrackSelect(prevIndex);
    }
  }, [currentTrackIndex, artist, handleTrackSelect]);

  const handleProgressChange = (e) => {
    if (!audioRef.current) return;
    const newProgress = e.target.value;
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    // Update volume in real-time without restarting playback
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    setupAudio();
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [setupAudio]);

  if (!artist) return null;

  const currentSong = artist.songs[currentTrackIndex] || {};
  console.log('Data..',currentSong);
  

  return (
    <div className="fixed inset-0 bg-[#121212] z-50 flex flex-col">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-b from-[#5e857c]/30 to-[#121212] p-6 flex items-center">
        <button
          onClick={onClose}
          className="mr-4 text-white hover:bg-black/30 rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{artist.name}</h1>
          <p className="text-gray-300">Artist</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-end gap-6 mb-8">
          <img
            src={artist.img || "/placeholder.svg"}
            alt={artist.name}
            className="w-48 h-48 object-cover shadow-lg"
          />
          <div>
            <p className="text-white text-sm font-bold">PUBLIC PLAYLIST</p>
            <h2 className="text-5xl font-bold text-white my-4">{currentSong.sAlbum}</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white">{artist.name}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{artist.songs.length} songs</span>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="mb-8">
          <button
            onClick={togglePlayPause}
            className="bg-[#5e857c] hover:bg-[#4a6b63] text-white rounded-full px-8 py-3 font-bold flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Play
              </>
            )}
          </button>
        </div>

        {/* Songs List */}
        <div className="mb-24">
          <div className="grid grid-cols-12 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-4">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2 text-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>

          {artist.songs.map((song, index) => (
            <div
              key={song._id}
              onClick={() => handleTrackSelect(index)}
              className={`grid grid-cols-12 items-center p-3 rounded hover:bg-gray-800/50 ${currentTrackIndex === index ? 'bg-gray-800/30' : ''}`}
            >
              <div className="col-span-1 text-center text-gray-400">
                {currentTrackIndex === index && isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5e857c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="col-span-6 flex items-center gap-4">
                <img
                  src={song.file_url || "/placeholder.svg"}
                  alt={song.sName}
                  className="w-10 h-10 object-cover"
                />
                <div>
                  <p className={`font-medium ${currentTrackIndex === index ? 'text-[#5e857c]' : 'text-white'}`}>{song.sName}</p>
                  <p className="text-gray-400">{artist.name}</p>
                </div>
              </div>
              <div className="col-span-3 text-gray-400">
                {song.album || "Single"}
              </div>
              <div className="col-span-2 text-right text-gray-400">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#282828] to-[#121212] border-t border-gray-800 p-2 sm:p-4">
        {/* Progress bar */}
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <span className="text-xs text-gray-400 w-10 sm:w-12 text-right">
            {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5e857c]"
          />
          <span className="text-xs text-gray-400 w-10 sm:w-12">
            {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          {/* Track info - Mobile top, Desktop left */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-1/4 order-1 sm:order-none">
            <img
              src={currentSong.file_url || "/placeholder.svg"}
              alt={currentSong.sName}
              className="w-10 h-10 sm:w-14 sm:h-14 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentSong.sName}</p>
              <p className="text-xs text-gray-400 truncate">{artist.name}</p>
            </div>
            <button className="text-gray-400 hover:text-white ml-1 sm:ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>

          {/* Player controls - Mobile bottom, Desktop center */}
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-2/4 justify-center order-3 sm:order-none">
            <button className="text-gray-400 hover:text-white hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <button onClick={handlePrevious} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </button>
            <button
              onClick={togglePlayPause}
              className="bg-[#5e857c] rounded-full p-1 sm:p-2 text-black hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" sm:width="24" sm:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" sm:width="24" sm:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
            <button onClick={handleNext} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Volume controls - Mobile hidden, Desktop right */}
          <div className="hidden sm:flex items-center gap-2 w-1/4 justify-end order-2 sm:order-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 sm:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5e857c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPlaylist;