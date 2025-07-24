import React, { createContext, useContext, useState } from 'react';

// Context to hold the current playing episode/audio file
const AudioPlayerContext = createContext();

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null); // { episode, podcast, audioUrl }

  return (
    <AudioPlayerContext.Provider value={{ currentAudio, setCurrentAudio }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}; 