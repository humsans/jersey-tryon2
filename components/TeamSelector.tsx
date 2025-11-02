
import React from 'react';
import { Team } from '../types';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: Team | null;
  onSelectTeam: (team: Team | null) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({ teams, selectedTeam, onSelectTeam }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = event.target.value;
    const team = teams.find(t => t.id === teamId) || null;
    onSelectTeam(team);
  };

  return (
    <div>
      <label htmlFor="team-select" className="block text-sm font-medium text-gray-400 mb-2">
        1. Select Team
      </label>
      <div className="relative">
        <select
          id="team-select"
          value={selectedTeam?.id || ''}
          onChange={handleChange}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        {selectedTeam && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img src={selectedTeam.logo} alt={`${selectedTeam.name} logo`} className="h-6 w-6" />
          </div>
        )}
         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};
