import { formatDate } from "../utils/formatDate";

export default function PodcastDetailHeader({ show, genres, seasons }) {
  return (
    <div className="podcast-detail-header">
      <div className="podcast-detail-cover">
        {/* Show podcast cover image if available */}
        {show.image ? <img src={show.image} alt="Podcast Cover" /> : "Podcast Cover Image"}
      </div>
      <div className="podcast-detail-header-info">
        <h1>{show.title}</h1>
        <p className="podcast-detail-description">{show.description}</p>
        {/* Render genre badges */}
        <div className="podcast-detail-genres">
          {genres.map((g) => (
            <span key={g} className="podcast-detail-genre-badge">{g}</span>
          ))}
        </div>
        {/* Show podcast stats: total seasons, episodes, last updated */}
        <div className="podcast-detail-stats">
          <div>
            <div className="podcast-detail-stat-label">TOTAL SEASONS</div>
            <div>{seasons.length} Seasons</div>
          </div>
          <div>
            <div className="podcast-detail-stat-label">TOTAL EPISODES</div>
            <div>{seasons.reduce((acc, s) => acc + (s.episodes?.length || 0), 0)} Episodes</div>
          </div>
          <div>
            <div className="podcast-detail-stat-label">LAST UPDATED</div>
            <div>{show.updated ? formatDate(show.updated) : "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 