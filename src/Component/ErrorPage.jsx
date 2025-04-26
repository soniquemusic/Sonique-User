import React from 'react'

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4 sm:px-8 md:px-16">
            <div className="mb-8">
                <img
                    src="../../../public/lightened_logo.png"
                    alt="Music Logo"
                    className="w-44 h-auto mx-auto sm:w-44 md:w-48 lg:w-56"
                />
            </div>
            <h1 className="text-7xl sm:text-8xl md:text-8xl font-bold mb-4 text-[#3f4d48]">404</h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 text-center">
                Oops! The page you're looking for doesn't exist.
            </p>
            <a
                href="/"
                className="px-4 py-2 bg-[#2e4e43] text-black rounded-lg hover:bg-[#49524f] transition duration-300"
            >
                Back to Home
            </a>
        </div>
    )
}

export default ErrorPage
