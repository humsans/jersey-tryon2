
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Premier League Virtual Try-On
          </span>
        </h1>
        <p className="text-gray-400 mt-1">Powered by Gemini</p>
      </div>
    </header>
  );
};
