import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">Blank</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Blank</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Blank</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Blank</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
