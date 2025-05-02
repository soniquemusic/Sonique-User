import React from 'react';

const AlbumList = ({ albums, error, onSelectAlbum, isLoading }) => {
    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    if (isLoading) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold text-[#5e857c] mb-6">Popular Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="w-full aspect-square bg-gray-700 rounded-lg mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-[#5e857c] mb-6">Popular Albums</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {albums.map((album) => (
                    <div
                        key={album.id}
                        onClick={() => onSelectAlbum(album)}
                        className="cursor-pointer group"
                    >
                        <div className="relative mb-2">
                            <img
                                src={album.img || "/placeholder.svg"}
                                alt={album.name}
                                className="w-full aspect-square object-cover rounded-lg group-hover:opacity-90 transition"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-[#5e857c] rounded-full p-3">
                                    ▶
                                </div>
                            </div>
                        </div>
                        <h3 className="text-white text-center font-medium truncate">{album.name}</h3>
                        <p className="text-gray-400 text-center text-sm truncate">{album.artist}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumList;