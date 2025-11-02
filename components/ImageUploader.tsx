
import React, { useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onImageUpload(file);
    } else {
      setFileName('');
      onImageUpload(null);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        3. Upload Your Photo
      </label>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-gray-700 border-2 border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-500 focus:outline-none"
      >
        <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="font-medium text-gray-400">
                {fileName || 'Drop files to Attach, or browse'}
            </span>
        </span>
        <input
            id="file-upload"
            name="file_upload"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleFileChange}
        />
      </label>
      <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP. For best results, use a clear, front-facing photo.</p>
    </div>
  );
};
