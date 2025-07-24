import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const playerStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
};

export default function GlobalAudioPlayer() {
  const { currentAudio } = useAudioPlayer();
  const playerRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlayingRef.current) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (!currentAudio) return null;

  return (
    <div style={playerStyle}>
      <AudioPlayer
        ref={playerRef}
        src={currentAudio.audioUrl}
        autoPlay
        showJumpControls={false}
        header={
          <div>
            <strong>{currentAudio.episode?.title || 'Episode Title'}</strong>
            <div style={{ fontSize: '0.9em', color: '#666' }}>{currentAudio.podcast?.title || ''}</div>
          </div>
        }
        onPlay={() => { isPlayingRef.current = true; }}
        onPause={() => { isPlayingRef.current = false; }}
        onEnded={() => { isPlayingRef.current = false; }}
      />
    </div>
  );
} 