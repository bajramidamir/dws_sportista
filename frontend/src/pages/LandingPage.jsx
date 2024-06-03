import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col min-h-screen pt-4" style={{ backgroundImage: 'url(/images/home-bg.png)' }}>
        <header className="flex justify-between px-8 py-8 items-center mb-4">
          <div className="text-2xl font-bold">Sportsman</div>
          <nav className="space-x-6">
            <a href="/home" className="bg-orange-500 p-3 hover:bg-orange-600">HOME</a>
            <a href="/login" className="p-3 hover:bg-gray-700">LOGIN</a>
            <a href="/signup" className="p-3 hover:bg-gray-700">SIGNUP</a>
          </nav>
        </header>
        <main className="flex-1 flex flex-col justify-center items-center bg-cover text-center space-y-8" >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            ALL YOU NEED <br />
            <span className="text-orange-500">TO FIND YOUR FIT</span>
          </h1>
          <p className="text-lg md:text-xl">
            CHANGE YOUR LIFE FOR THE BETTER, ONE MATCH AT A TIME.
          </p>
          <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded hover:bg-orange-600 transition">
            BOOK NOW
          </button>
        </main>
      </div>

      <div className="bg-gray-800 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-500">10,000+</h3>
              <p className="text-lg">Active Users</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-500">500+</h3>
              <p className="text-lg">Matches Played</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-500">1,000+</h3>
              <p className="text-lg">Courts Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-500 text-black py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg md:text-xl mb-4">
            Choose a court and sport you want to play, then select one of the available terms. Our system will match you up with other players who have selected the same term.
          </p>
          <p className="text-lg md:text-xl">
            This ensures that you always have someone to play with, no matter when or where you want to play.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Now</h2>
          <p className="text-lg md:text-xl mb-6">
            Don't miss out on the fun and excitement. Join Sportsman today and start playing!
          </p>
          <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded hover:bg-orange-600 transition">
            SIGN UP NOW
          </button>
        </div>
      </div>

      <footer className="flex justify-center items-center py-8 bg-gray-900">
        <div>www.sportsman.com</div>
      </footer>
    </div>
  );
}

export default LandingPage;
