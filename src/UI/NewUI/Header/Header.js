import React from 'react';

const Header = () => {
  return (
    <div >

      <header className="bg-white p-4 shadow-md flex justify-between items-center">

        <button className="text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


        <h1 className="text-lg">Rewards & Deals</h1>


        <div className="bg-gray-200 rounded-full p-3 flex items-center justify-center w-8 h-8 text-gray-600">HP</div>
      </header>


     
    </div>
  );
};

export default Header;