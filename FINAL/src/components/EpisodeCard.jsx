
// Props:
// - ep: the episode object (title, description, duration, date, etc.)
// - idx: the index of the episode in the season (used for numbering)
// - currentSeason: the current season object (for image and season number)
import { truncate } from "../utils/truncate";
import { formatDate } from "../utils/formatDate";
import FavouriteButton from "./FavouriteButton";
import { useAudioPlayer } from '../context/AudioPlayerContext';

export default function EpisodeCard({ ep, idx, currentSeason, podcastId, podcastTitle }) {
  const { setCurrentAudio } = useAudioPlayer();
  // Compose a unique key for the episode
  const episodeKey = `${podcastId}-${currentSeason.season}-${ep.episode}`;

  // Handler to play the selected episode
  const handlePlay = () => {
    setCurrentAudio({
      episode: ep,
      podcast: { id: podcastId, title: podcastTitle },
      audioUrl: ep.file,
      image: ep.image || currentSeason.image, // episode image first, then season image
    });
  };

  return (
    <div className="podcast-detail-episode-card" style={{ position: 'relative' }}>
      {/* Heart icon in top right */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
        <FavouriteButton episodeKey={episodeKey} />
      </div>
      {/* Badge with season image or season number if no image */}
      <div className="podcast-detail-episode-badge">
        {currentSeason.image ? (
          <img
            src={currentSeason.image}
            alt={`Season ${currentSeason.season} Cover`}
            style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }}
          />
        ) : (
          `S${currentSeason.season}`
        )}
      </div>
      <div className="podcast-detail-episode-info">
        {/* Episode title with episode number */}
        <div className="podcast-detail-episode-title">
          <span className="podcast-detail-episode-number">Episode {idx + 1}:</span> {ep.title}
        </div>
        {/* Truncated episode description for preview */}
        <div className="podcast-detail-episode-description">{truncate(ep.description, 120)}</div>
        <div className="podcast-detail-episode-meta">
          {ep.duration ? `${ep.duration} min` : ""}
          {ep.duration && ep.date ? " • " : ""}
          {ep.date ? formatDate(ep.date) : ""}
        </div>
        {/* Play button */}
        <button onClick={handlePlay} style={{ marginTop: 8, padding: '6px 16px', borderRadius: 4, background: '#222', color: '#fff', border: 'none', cursor: 'pointer' }}>
          ▶ Play
        </button>
      </div>
    </div>
  );
} 