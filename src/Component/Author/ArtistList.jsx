// ArtistList.js - List component (same as before)
import React from 'react';

const ArtistList = ({ artists, error, onSelectArtist }) => {
    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-[#5e857c] mb-6">Popular Artists</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {artists.map((artist) => (
                    <div
                        key={artist.id}
                        onClick={() => onSelectArtist(artist)}
                        className="cursor-pointer group"
                    >
                        <div className="relative mb-2">
                            <img
                                src={artist.img || "/placeholder.svg"}
                                alt={artist.name}
                                className="w-full aspect-square object-cover rounded-full group-hover:opacity-90 transition"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-[#5e857c] rounded-full p-3">
                                    ▶
                                </div>
                            </div>
                        </div>
                        <h3 className="text-white text-center font-medium truncate">{artist.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArtistList;