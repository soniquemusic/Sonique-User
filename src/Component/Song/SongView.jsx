// SongView.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SongList from './SongList';
import SongPlayer from './SongPlayer';

const SongView = () => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(80);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const fetchSongs = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch('https://sonique-server.onrender.com/sonique/song/get-song');
            if (!res.ok) throw new Error('Failed to fetch songs');

            const data = await res.json();
            const songsData = data.songs || (Array.isArray(data) ? data : [data]);
            setSongs(songsData);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load songs');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const setupAudio = useCallback((autoplay = false) => {
        if (!selectedSong) return;

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        const audio = new Audio(selectedSong.audio_url);
        audioRef.current = audio;
        audio.volume = volume / 100;

        audio.onloadedmetadata = () => {
            setDuration(audio.duration);
        };

        audio.ontimeupdate = () => {
            setCurrentTime(audio.currentTime);
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        audio.onended = () => {
            handleNext();
        };

        if (autoplay) {
            audio.oncanplaythrough = () => {
                audio.play().catch((err) => console.error('Play error:', err));
            };
        }
    }, [selectedSong, volume]);

    const handleSelectSong = (song) => {
        const index = songs.findIndex(s => s._id === song._id);
        setSelectedSong(song);
        setCurrentSongIndex(index);
        setIsPlaying(true);
        setProgress(0);
        setCurrentTime(0);
    };

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.error('Playback error:', err));
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e) => {
        if (!audioRef.current || isLoading) return;
        const newProgress = parseFloat(e.target.value);
        const newTime = (newProgress / 100) * duration;
        audioRef.current.currentTime = newTime;
        setProgress(newProgress);
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const handleClosePlayer = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setSelectedSong(null);
        setCurrentSongIndex(-1);
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
    };

    const handleNext = () => {
        if (currentSongIndex < songs.length - 1) {
            const nextIndex = currentSongIndex + 1;
            setSelectedSong(songs[nextIndex]);
            setCurrentSongIndex(nextIndex);
            setIsPlaying(true);
        } else {
            handleClosePlayer();
        }
    };

    const handlePrevious = () => {
        if (currentSongIndex > 0) {
            const prevIndex = currentSongIndex - 1;
            setSelectedSong(songs[prevIndex]);
            setCurrentSongIndex(prevIndex);
            setIsPlaying(true);
        } else if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            setProgress(0);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs]);

    useEffect(() => {
        if (selectedSong && isPlaying) {
            setupAudio(true); // autoplay true
        }
    }, [selectedSong]);

    const hasNext = currentSongIndex < songs.length - 1;
    const hasPrevious = currentSongIndex > 0;

    return (
        <div className="relative">
            <SongList
                songs={songs}
                error={error}
                onSelectSong={handleSelectSong}
                isLoading={isLoading}
            />
            {selectedSong && (
                <SongPlayer
                    song={selectedSong}
                    onClose={handleClosePlayer}
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                    progress={progress}
                    handleProgressChange={handleProgressChange}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                    currentTime={currentTime}
                    duration={duration}
                    audioRef={audioRef}
                    volume={volume}
                    handleVolumeChange={handleVolumeChange}
                />
            )}
        </div>
    );
};

export default SongView;
