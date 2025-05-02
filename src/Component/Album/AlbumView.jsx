import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AlbumList from './AlbumList';
import AlbumPlaylist from './AlbumPlaylist';

const AlbumView = () => {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { albumId } = useParams();
    const navigate = useNavigate();

    const fetchAlbums = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch('https://sonique-server.onrender.com/sonique/album/albums');
            if (!res.ok) throw new Error('Failed to fetch albums');

            const { albumsWithSongs = [] } = await res.json();

            const albumList = albumsWithSongs.map(({ album, songs, artist }) => ({
                id: album._id,
                name: album.alName,
                img: album.file_url,
                artist: album.albumName,
                year: album.year || new Date().getFullYear(),
                songs: songs.map(song => ({
                    ...song,
                    audio_url: song.audio_url,
                    duration: song.duration || "3:30"
                }))
            }));

            setAlbums(albumList);

            if (albumId) {
                const album = albumList.find(a => a.id === albumId);
                setSelectedAlbum(album || null);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load albums');
        } finally {
            setIsLoading(false);
        }
    }, [albumId]);

    const handleSelectAlbum = (album) => {
        setSelectedAlbum(album);
        navigate(`/sonique/album/${album.id}`);
    };

    const handleClosePlaylist = () => {
        setSelectedAlbum(null);
        navigate('/');
    };

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <>
            {!albumId ? (
                <AlbumList
                    albums={albums}
                    error={error}
                    onSelectAlbum={handleSelectAlbum}
                    isLoading={isLoading}
                />
            ) : (
                <AlbumPlaylist
                    album={selectedAlbum}
                    onClose={handleClosePlaylist}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default AlbumView;