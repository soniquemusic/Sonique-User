import React from 'react';

const SongPlayer = ({
    song,
    onClose,
    isPlaying,
    togglePlayPause,
    progress,
    handleProgressChange,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
    currentTime,
    duration,
    audioRef,
    volume,
    handleVolumeChange
}) => {
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#282828] to-[#121212] border-t border-gray-800 p-4 z-50">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400 w-12 text-right">
                    {formatTime(currentTime)}
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5e857c]"
                />
                <span className="text-xs text-gray-400 w-12">
                    {formatTime(duration)}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-3 w-full sm:w-1/4">
                    <img
                        src={song?.file_url || "/placeholder.svg"}
                        alt={song?.sName}
                        className="w-10 h-10 sm:w-14 sm:h-14 object-cover"
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{song?.sName}</p>
                        <p className="text-xs text-gray-400 truncate">{song?.sAuthor}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="ml-2 text-gray-400 hover:text-white"
                        aria-label="Close player"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-2/4 justify-center">
                    <button
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                        className={`p-2 ${hasPrevious ? 'text-gray-200 hover:text-white' : 'text-gray-500'}`}
                    >
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className={`p-2 ${hasNext ? 'text-gray-200 hover:text-white' : 'text-gray-500'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 4 15 12 5 20 5 4"></polygon>
                            <line x1="19" y1="5" x2="19" y2="19"></line>
                        </svg>
                    </button>
                </div>

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
    );
};

export default SongPlayer;