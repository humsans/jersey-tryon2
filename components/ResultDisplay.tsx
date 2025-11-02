
import React from 'react';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImagePanel: React.FC<{ src: string | null, title: string, isLoading?: boolean }> = ({ src, title, isLoading = false }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-center mb-2 text-gray-400">{title}</h3>
      <div className="aspect-w-1 aspect-h-1 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-full h-full bg-gray-700 animate-pulse"></div>
          </div>
        ) : src ? (
          <img src={src} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        )}
      </div>
    </div>
  );
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading, error }) => {
    if (!originalImage && !isLoading && !error) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] bg-gray-800/50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-700">
                <svg className="w-24 h-24 text-gray-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-bold text-white">Your Virtual Try-On Awaits</h2>
                <p className="text-gray-400 mt-2 max-w-md">
                    Choose your team, select a jersey, and upload a photo to see the magic happen right here.
                </p>
            </div>
        );
    }
  
    if (error) {
        return (
             <div className="flex flex-col items-center justify-center h-full min-h-[50vh] bg-red-900/20 rounded-2xl p-8 text-center border-2 border-dashed border-red-500/50">
                <svg className="w-16 h-16 text-red-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-red-300">An Error Occurred</h2>
                <p className="text-red-400 mt-2">{error}</p>
            </div>
        )
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ImagePanel src={originalImage} title="Original" />
      <ImagePanel src={generatedImage} title="Try-On Result" isLoading={isLoading} />
    </div>
  );
};
