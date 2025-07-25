
// Props:
// - currentSeason: object containing details about the current season (title, image, description, year, etc.)
// - episodes: array of episode objects for the current season
import EpisodeCard from "./EpisodeCard";

export default function SeasonDetails({ currentSeason, episodes, podcastId }) {
  return (
    <div className="podcast-detail-season-details">
      {/* Header section with season cover, title, description, and meta info */}
      <div className="podcast-detail-season-header">
        <div className="podcast-detail-season-cover">
          {/* Show season image if available, otherwise show placeholder text */}
          {currentSeason.image ? <img src={currentSeason.image} alt="Season Cover" /> : `Season ${currentSeason.season} Cover`}
        </div>
        <div>
          <h3>{currentSeason.title}</h3>
          <div className="podcast-detail-season-description">{currentSeason.description}</div>
          <div className="podcast-detail-season-meta">
            {/* Show number of episodes and release year */}
            {episodes.length} Episodes &bull; Released {currentSeason.year || "-"}
          </div>
        </div>
      </div>
      {/* Episode List */}
      <div>
        {/* Render an EpisodeCard for each episode in the season */}
        {episodes.map((ep, idx) => (
          <EpisodeCard key={ep.id || idx} ep={ep} idx={idx} currentSeason={currentSeason} podcastId={podcastId} />
        ))}
       
        {/* Show message if no episodes found */}
        {episodes.length === 0 && <div className="podcast-detail-no-episodes">No episodes found for this season.</div>}
      </div>
    </div>
  );
} 