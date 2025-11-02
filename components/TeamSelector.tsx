import React, { useState, useRef, useEffect } from 'react';
import { Team } from '../types';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: Team | null;
  onSelectTeam: (team: Team | null) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, selectedTeam, onSelectTeam }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (team: Team) => {
    onSelectTeam(team);
    setIsOpen(false);
  };

  return (
    <div>
      <label id="team-select-label" className="block text-sm font-medium text-gray-400 mb-2">
        1. Select Team
      </label>
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="team-select-label"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-4 pr-10 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
        >
          <span className="flex items-center">
            {selectedTeam ? (
              <>
                <img src={selectedTeam.logo} alt={`${selectedTeam.name} logo`} className="h-6 w-6 flex-shrink-0" />
                <span className="ml-3 block truncate">{selectedTeam.name}</span>
              </>
            ) : (
              <span className="block truncate">Select a team</span>
            )}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
             <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="team-select-label"
          >
            {teams.map((team) => (
              <li
                key={team.id}
                onClick={() => handleSelect(team)}
                className="text-gray-200 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-cyan-600/50"
                role="option"
                aria-selected={selectedTeam?.id === team.id}
              >
                <div className="flex items-center">
                  <img src={team.logo} alt={`${team.name} logo`} className="h-6 w-6 flex-shrink-0" />
                  <span className={`font-normal ml-3 block truncate ${selectedTeam?.id === team.id ? 'font-semibold' : ''}`}>
                    {team.name}
                  </span>
                </div>
                {selectedTeam?.id === team.id && (
                   <span className="text-cyan-300 absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};