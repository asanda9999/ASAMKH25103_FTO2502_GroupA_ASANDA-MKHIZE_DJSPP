import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import '../styles/globalAudioPlayer.css';
import { FaBackward, FaForward } from 'react-icons/fa';

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

  const displayImage = currentAudio.image || currentAudio.episode?.image || currentAudio.podcast?.image;

  const handleRewind = () => {
    const audio = playerRef.current?.audio?.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 15);
    }
  };

  const handleForward = () => {
    const audio = playerRef.current?.audio?.current;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 30);
    }
  };

  return (
    <div className="global-audio-player">
      <div className="global-audio-player-row">
        <div className="global-audio-player-image">
          {displayImage ? (
            <img src={displayImage} alt="Episode/Season Cover" />
          ) : (
            <span style={{ color: '#fff', fontWeight: 600 }}>Cover</span>
          )}
        </div>
        <div className="global-audio-player-content">
          <AudioPlayer
            ref={playerRef}
            src={currentAudio.audioUrl}
            autoPlay
            showJumpControls={false}
            customAdditionalControls={[]}
            customControlsSection={[
              <button key="rewind" onClick={handleRewind} aria-label="Rewind 15 seconds" style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 20, cursor: 'pointer', margin: '0 8px' }}>
                <FaBackward />
              </button>,
              "MAIN_CONTROLS",
              <button key="forward" onClick={handleForward} aria-label="Forward 30 seconds" style={{ background: 'none', border: 'none', color: 'inherit', fontSize: 20, cursor: 'pointer', margin: '0 8px' }}>
                <FaForward />
              </button>
            ]}
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
      </div>
    </div>
  );
} 