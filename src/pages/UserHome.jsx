import React from 'react'
import Navbar from '../Component/Navbar'
import { Route, Routes } from 'react-router-dom'
import AlbumView from '../Component/Album/AlbumView'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import ArtistView from '../Component/Author/ArtistView'
import ErrorPage from '../Component/ErrorPage'

const UserHome = () => {
    return (

        <>
            <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1c1c1c] text-white">
                <Navbar />

                <Routes>
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />

                    {/* <Route path="/sonique/user/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                    <Route path="/sonique/user/setting" element={<PrivateRoute><Settings /></PrivateRoute>} /> */}

                    <Route path="/sonique/artist" element={<PrivateRoute><ArtistView /></PrivateRoute>} />

                    <Route path="/sonique/artist/:artistId" element={<PrivateRoute><ArtistView /></PrivateRoute>} />

                    <Route path="/sonique/album" element={<PrivateRoute><AlbumView /></PrivateRoute>} />

                    <Route path="/sonique/album/:albumId" element={<PrivateRoute><AlbumView /></PrivateRoute>} />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </>

    )
}

export default UserHome