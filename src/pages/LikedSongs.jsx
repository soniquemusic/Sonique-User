import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LikedSongs = ({ onClose }) => {
    const [likedSongs, setLikedSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Load liked songs from localStorage
    useEffect(() => {
        const storedSongs = localStorage.getItem('favoriteSongs');
        if (storedSongs) {
            setLikedSongs(JSON.parse(storedSongs));
        }
        setIsLoading(false);
    }, []);

    // Remove song from favorites
    const removeFromFavorites = (songId) => {
        const updatedSongs = likedSongs.filter(song => song._id !== songId);
        setLikedSongs(updatedSongs);
        localStorage.setItem('favoriteSongs', JSON.stringify(updatedSongs));
    };

    // Skeleton loader
    const SkeletonLoader = ({ className }) => (
        <div className={`animate-pulse bg-gray-700 rounded ${className}`}></div>
    );

    // Renamed function to avoid conflict
    const handleClose = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="bg-[#121212] flex flex-col h-full">
                {/* Header Skeleton */}
                <div className="bg-gradient-to-b from-[#5e857c]/30 to-[#121212] p-6 flex items-center">
                    <SkeletonLoader className="w-8 h-8 rounded-full mr-4" />
                    <div>
                        <SkeletonLoader className="w-32 h-6 mb-2" />
                        <SkeletonLoader className="w-20 h-3" />
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-end gap-6 mb-8">
                        <SkeletonLoader className="w-48 h-48 rounded" />
                        <div className="flex-1">
                            <SkeletonLoader className="w-24 h-3 mb-4" />
                            <SkeletonLoader className="w-48 h-6 mb-6" />
                            <div className="flex gap-4">
                                <SkeletonLoader className="w-24 h-3" />
                                <SkeletonLoader className="w-4 h-3" />
                                <SkeletonLoader className="w-20 h-3" />
                            </div>
                        </div>
                    </div>

                    {/* Songs List Skeleton */}
                    <div className="mb-24">
                        <div className="grid grid-cols-12 gap-4 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <React.Fragment key={i}>
                                    <div className="col-span-1 flex justify-center">
                                        <SkeletonLoader className="w-4 h-4" />
                                    </div>
                                    <div className="col-span-6 flex items-center gap-4">
                                        <SkeletonLoader className="w-10 h-10" />
                                        <div className="flex-1">
                                            <SkeletonLoader className="w-3/4 h-4 mb-2" />
                                            <SkeletonLoader className="w-1/2 h-3" />
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <SkeletonLoader className="w-16 h-3" />
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <SkeletonLoader className="w-8 h-3" />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] flex flex-col h-full">
            {/* Header */}
            <div className="bg-gradient-to-b from-[#5e857c]/30 to-[#121212] p-6 flex items-center">
                <button
                    onClick={handleClose}
                    className="mr-4 text-white hover:bg-black/30 rounded-full p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Liked Songs</h1>
                    <p className="text-gray-300">Playlist</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-end gap-6 mb-8">
                    <div className="w-48 h-48 bg-gradient-to-br from-[#5e857c] to-[#121212] flex items-center justify-center shadow-lg">
                        <FaHeart className="text-white text-5xl" />
                    </div>
                    <div>
                        <p className="text-white text-sm font-bold">PLAYLIST</p>
                        <h2 className="text-5xl font-bold text-white my-4">Liked Songs</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-white">Your favorites</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">{likedSongs.length} songs</span>
                        </div>
                    </div>
                </div>

                {/* Play Button */}
                <div className="mb-8">
                    <button className="bg-[#5e857c] hover:bg-[#4a6b63] text-white rounded-full px-8 py-3 font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Play
                    </button>
                </div>

                {/* Songs List */}
                <div className="mb-24">
                    <div className="grid grid-cols-12 text-gray-400 text-sm border-b border-gray-800 pb-2 mb-4">
                        <div className="col-span-1 text-center">#</div>
                        <div className="col-span-6">Title</div>
                        <div className="col-span-3">Artist</div>
                        <div className="col-span-2 text-right">Duration</div>
                    </div>

                    {likedSongs.length > 0 ? (
                        likedSongs.map((song, index) => (
                            <div
                                key={song._id}
                                className="grid grid-cols-12 items-center p-3 rounded hover:bg-gray-800/50"
                            >
                                <div className="col-span-1 text-center text-gray-400">
                                    {index + 1}
                                </div>
                                <div className="col-span-6 flex items-center gap-4">
                                    <img
                                        src={song.file_url || "/placeholder.svg"}
                                        alt={song.sName}
                                        className="w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-white">{song.sName}</p>
                                        <p className="text-gray-400">{song.sAuthor || 'Unknown Artist'}</p>
                                    </div>
                                </div>
                                <div className="col-span-3 text-gray-400">
                                    {song.album || "Single"}
                                </div>
                                <div className="col-span-2 flex justify-end items-center gap-4">
                                    <span className="text-gray-400">{song.duration || '0:00'}</span>
                                    <button
                                        onClick={() => removeFromFavorites(song._id)}
                                        className="text-[#5e857c] hover:text-[#4a6b63]"
                                    >
                                        <FaHeart size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <p className="text-lg">No liked songs yet</p>
                            <p className="text-sm mt-2">Like songs to see them here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LikedSongs;
