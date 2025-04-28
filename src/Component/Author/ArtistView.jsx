// ArtistView.js - Main component
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArtistList from './ArtistList';
import ArtistPlaylist from './ArtistPlaylist';

const ArtistView = () => {
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const { artistId } = useParams();
    const navigate = useNavigate();

    const fetchArtists = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:3000/sonique/author/authors');
            if (!res.ok) throw new Error('Failed to fetch artists');

            const { authorsWithSongs = [] } = await res.json();

            const authorList = authorsWithSongs.map(({ author, songs }) => ({
                id: author._id,
                name: author.auName,
                img: author.file_url,
                songs: songs.map(song => ({
                    ...song,
                    audio_url: song.audio_url,
                    duration: song.duration || "3:30"
                }))
            }));

            setArtists(authorList);
            
            if (artistId) {
                const artist = authorList.find(a => a.id === artistId);
                setSelectedArtist(artist || null);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load artists');
        }
    }, [artistId]);

    const handleSelectArtist = (artist) => {
        setSelectedArtist(artist);
        navigate(`/sonique/artist/${artist.id}`);
    };

    const handleClosePlaylist = () => {
        setSelectedArtist(null);
        navigate('/');
    };

    useEffect(() => {
        fetchArtists();
    }, [fetchArtists]);

    return (
        <>
            {!artistId ? (
                <ArtistList 
                    artists={artists} 
                    error={error} 
                    onSelectArtist={handleSelectArtist} 
                />
            ) : (
                <ArtistPlaylist 
                    artist={selectedArtist} 
                    onClose={handleClosePlaylist} 
                />
            )}
        </>
    );
};

export default ArtistView;