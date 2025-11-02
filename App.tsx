
import React, { useState, useCallback } from 'react';
import { Team, JerseyType } from './types';
import { PREMIER_LEAGUE_TEAMS } from './constants';
import { generateTryOnImage } from './services/geminiService';

import { Header } from './components/Header';
import { TeamSelector } from './components/TeamSelector';
import { JerseySelector } from './components/JerseySelector';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(PREMIER_LEAGUE_TEAMS[0]);
  const [selectedJersey, setSelectedJersey] = useState<JerseyType>('Home');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null); // Clear previous result on new image upload
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setOriginalImage(null);
      setOriginalImageFile(null);
    }
  };

  const handleTryOn = useCallback(async () => {
    if (!originalImageFile || !selectedTeam) {
      setError('Please select a team and upload an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(originalImageFile);
      reader.onload = async (event) => {
        const base64WithPrefix = event.target?.result as string;
        const base64Data = base64WithPrefix.split(',')[1];
        const mimeType = originalImageFile.type;

        const resultBase64 = await generateTryOnImage(
          base64Data,
          mimeType,
          selectedTeam.name,
          selectedJersey
        );

        setGeneratedImage(`data:image/png;base64,${resultBase64}`);
      };
      reader.onerror = () => {
         setError('Failed to read the uploaded image file.');
         setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate the image. Please try again.');
    } finally {
        // A small timeout to let the state update before setting loading to false
        setTimeout(() => setIsLoading(false), 500);
    }
  }, [originalImageFile, selectedTeam, selectedJersey]);
  
  const isTryOnDisabled = !originalImage || !selectedTeam || isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-gray-800/50 rounded-2xl p-6 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Customise Your Kit</h2>
            <div className="space-y-6">
              <TeamSelector
                teams={PREMIER_LEAGUE_TEAMS}
                selectedTeam={selectedTeam}
                onSelectTeam={setSelectedTeam}
              />
              <JerseySelector
                selectedJersey={selectedJersey}
                onSelectJersey={setSelectedJersey}
              />
              <ImageUploader onImageUpload={handleImageUpload} />
              <button
                onClick={handleTryOn}
                disabled={isTryOnDisabled}
                className={`w-full text-lg font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center
                  ${isTryOnDisabled 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-cyan-500 hover:bg-cyan-400 text-gray-900 shadow-lg shadow-cyan-500/20 transform hover:scale-105'
                  }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Virtually Try On'
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ResultDisplay 
              originalImage={originalImage}
              generatedImage={generatedImage}
              isLoading={isLoading}
              error={error}
              selectedTeam={selectedTeam}
              selectedJersey={selectedJersey}
              originalImageFile={originalImageFile}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
