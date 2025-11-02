
import React from 'react';
import { JerseyType } from '../types';

interface JerseySelectorProps {
  selectedJersey: JerseyType;
  onSelectJersey: (jersey: JerseyType) => void;
}

const jerseyOptions: { id: JerseyType, label: string }[] = [
    { id: 'Home', label: 'Home' },
    { id: 'Away', label: 'Away' },
    { id: 'Third', label: 'Third' },
];

export const JerseySelector: React.FC<JerseySelectorProps> = ({ selectedJersey, onSelectJersey }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        2. Select Jersey
      </label>
      <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-700 p-1">
        {jerseyOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectJersey(option.id)}
            className={`w-full py-2 px-3 text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-cyan-500
              ${selectedJersey === option.id 
                ? 'bg-cyan-500 text-gray-900 shadow' 
                : 'bg-transparent text-gray-300 hover:bg-gray-600'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
