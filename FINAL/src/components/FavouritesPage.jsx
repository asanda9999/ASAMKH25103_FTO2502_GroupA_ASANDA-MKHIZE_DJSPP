import { useEffect, useState } from "react";
import { getFavourites } from "../utils/favourites";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import Header from "./Header";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/favouritepage.css';

export default function FavouritesPage() {
  // State for favourite episodes, loading, sort order, and show filter
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest"); // default to 'Newest Added'
  const [showFilter, setShowFilter] = useState("all"); // 'all' or podcastId

  // Fetch and group favourites by podcastId
  const fetchFavourites = () => {
    setLoading(true);
    const favKeys = getFavourites();
    if (favKeys.length === 0) {
      setEpisodes([]);
      setLoading(false);
      return;
    }

    // Group by podcastId for efficient fetching
    const podcastMap = {};
    favKeys.forEach(fav => {
      if (!fav || typeof fav.key !== 'string') return; // skip malformed entries
      const [podcastId, seasonNum, episodeNum] = fav.key.split("-");
      if (!podcastId || !seasonNum || !episodeNum) return; // skip if split fails
      if (!podcastMap[podcastId]) podcastMap[podcastId] = [];
      podcastMap[podcastId].push({ seasonNum, episodeNum, key: fav.key, added: fav.added });
    });

    // Fetch all podcasts in parallel and map to favourite episodes
    Promise.all(
      Object.keys(podcastMap).map(podcastId =>
        fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
          .then(res => res.json())
          .then(podcast => {
            // Find all favourite episodes for this podcast
            const favEpisodes = [];
            podcastMap[podcastId].forEach(({ seasonNum, episodeNum, key, added }) => {
              const season = (podcast.seasons || []).find(s => String(s.season) === seasonNum);
              if (season) {
                const episode = (season.episodes || []).find(e => String(e.episode) === episodeNum);
                if (episode) {
                  favEpisodes.push({
                    podcastTitle: podcast.title,
                    podcastImage: podcast.image,
                    seasonTitle: season.title,
                    seasonNum,
                    seasonImage: season.image, // <-- add season image
                    episodeNum,
                    episode,
                    key,
                    added,
                  });
                }
              }
            });
            return { podcastId, podcastTitle: podcast.title, podcastImage: podcast.image, episodes: favEpisodes };
          })
      )
    ).then(results => {
      setEpisodes(results.filter(r => r.episodes.length > 0));
      setLoading(false);
    });
  };

  // Fetch favourites on mount
  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) return (
    <>
      <Header />
      <div className="favourites-page">
        <h2><Skeleton width={260} height={32} /></h2>
        <p><Skeleton width={320} height={20} /></p>
        {[1,2].map((_, i) => (
          <div key={i} className="favourites-group">
            <h3 className="favourites-group-header">
              <Skeleton circle width={32} height={32} style={{ marginRight: 8 }} />
              <Skeleton width={180} height={24} />
              <span style={{ color: '#888', fontWeight: 400, fontSize: 16, marginLeft: 8 }}><Skeleton width={60} height={18} /></span>
            </h3>
            {[1,2].map((_, j) => (
              <div key={j} className="favourites-episode-card">
                <div style={{ position: 'absolute', top: 12, right: 16, zIndex: 2 }}>
                  <Skeleton circle width={22} height={22} />
                </div>
                <div style={{ width: 60, height: 60, background: '#eee', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                  <Skeleton width={56} height={56} style={{ borderRadius: 6 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#2563eb', fontWeight: 600, fontSize: 16 }}><Skeleton width={90} height={18} /></span>
                  <span style={{ fontWeight: 700, fontSize: 18, marginLeft: 6 }}><Skeleton width={160} height={20} /></span>
                  <div style={{ color: '#888', fontSize: 14, margin: '4px 0' }}><Skeleton width={320} height={16} count={2} /></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
  if (episodes.length === 0) return <div>No favourite episodes yet.</div>;

  return (
    <>
      <Header />
      <div className="favourites-page">
      
        <h2>Favourite Episodes</h2>
        <p>Your saved episodes from all shows</p>
        <div className="favourites-controls">
          <label htmlFor="sortOrder" className="favourites-sort-label">Sort by:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="favourites-select"
          >
            <option value="newest">Newest Added</option>
            <option value="oldest">Oldest Added</option>
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
          <select
            id="showFilter"
            value={showFilter}
            onChange={e => setShowFilter(e.target.value)}
            className="favourites-select"
          >
            <option value="all">All Shows</option>
            {episodes.map(group => (
              <option key={group.podcastId} value={group.podcastId}>{group.podcastTitle}</option>
            ))}
          </select>
        </div>
        {episodes
          .filter(group => showFilter === "all" || group.podcastId === showFilter)
          .map(group => {
            // Sort episodes by selected order
            const sortedEpisodes = [...group.episodes].sort((a, b) => {
              if (sortOrder === "az") {
                const titleA = a.episode.title.toLowerCase();
                const titleB = b.episode.title.toLowerCase();
                return titleA.localeCompare(titleB);
              } else if (sortOrder === "za") {
                const titleA = a.episode.title.toLowerCase();
                const titleB = b.episode.title.toLowerCase();
                return titleB.localeCompare(titleA);
              } else if (sortOrder === "newest") {
                return b.added - a.added;
              } else if (sortOrder === "oldest") {
                return a.added - b.added;
              }
              return 0;
            });
          return (
            <div key={group.podcastId} className="favourites-group">
              <h3 className="favourites-group-header">
                {group.podcastImage && <img src={group.podcastImage} alt="" />}
                {group.podcastTitle} <span className="favourites-group-count">({group.episodes.length} episodes)</span>
              </h3>
              {sortedEpisodes.map(({ episode, episodeNum, key, seasonTitle, seasonNum, seasonImage }) => (
                <div key={key} className="favourites-episode-card">
                  {/* Heart icon in top right */}
                  <div className="favourites-episode-heart">
                    <FavouriteButton episodeKey={key} onToggle={fetchFavourites} />
                  </div>
                  <div className="favourites-episode-image">
                    {seasonImage ? (
                      <img src={seasonImage} alt="season cover" />
                    ) : group.podcastImage ? (
                      <img src={group.podcastImage} alt="podcast cover" />
                    ) : 'Cover'}
                  </div>
                  <div className="favourites-episode-info">
                    <span className="favourites-episode-title">Episode {episodeNum}:</span>
                    <span className="favourites-episode-title-main">{episode.title}</span>
                    <div className="favourites-episode-season">
                      Season {seasonNum}{seasonTitle ? `: ${seasonTitle}` : ''}
                    </div>
                    <div className="favourites-episode-description">{episode.description}</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
} 