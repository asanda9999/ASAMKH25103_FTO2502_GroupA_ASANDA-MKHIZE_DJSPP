import { useEffect, useState } from "react";
import { getFavourites } from "../utils/favourites";
import { Link } from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import Header from "./Header";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function FavouritesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract fetching logic into a function so it can be called on refresh
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
    favKeys.forEach(key => {
      const [podcastId, seasonNum, episodeNum] = key.split("-");
      if (!podcastMap[podcastId]) podcastMap[podcastId] = [];
      podcastMap[podcastId].push({ seasonNum, episodeNum, key });
    });

    // Fetch all podcasts in parallel
    Promise.all(
      Object.keys(podcastMap).map(podcastId =>
        fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
          .then(res => res.json())
          .then(podcast => {
            // Find all favourite episodes for this podcast
            const favEpisodes = [];
            podcastMap[podcastId].forEach(({ seasonNum, episodeNum, key }) => {
              const season = (podcast.seasons || []).find(s => String(s.season) === seasonNum);
              if (season) {
                const episode = (season.episodes || []).find(e => String(e.episode) === episodeNum);
                if (episode) {
                  favEpisodes.push({
                    podcastTitle: podcast.title,
                    podcastImage: podcast.image,
                    seasonTitle: season.title,
                    seasonNum,
                    episodeNum,
                    episode,
                    key,
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

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) return (
    <>
      <Header />
      <div className="favourites-page" style={{ maxWidth: 900, margin: '2rem auto', padding: 24 }}>
        <h2><Skeleton width={260} height={32} /></h2>
        <p><Skeleton width={320} height={20} /></p>
        {[1,2].map((_, i) => (
          <div key={i} style={{ marginBottom: 32 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', fontSize: 22 }}>
              <Skeleton circle width={32} height={32} style={{ marginRight: 8 }} />
              <Skeleton width={180} height={24} />
              <span style={{ color: '#888', fontWeight: 400, fontSize: 16, marginLeft: 8 }}><Skeleton width={60} height={18} /></span>
            </h3>
            {[1,2].map((_, j) => (
              <div key={j} style={{ background: '#fff', borderRadius: 8, padding: 16, margin: '12px 0', display: 'flex', alignItems: 'center', position: 'relative' }}>
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
      <div className="favourites-page" style={{ maxWidth: 900, margin: '2rem auto', padding: 24 }}>
      
        <h2>Favourite Episodes</h2>
        <p>Your saved episodes from all shows</p>
        {episodes.map(group => (
          <div key={group.podcastId} style={{ marginBottom: 32 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', fontSize: 22 }}>
              {group.podcastImage && <img src={group.podcastImage} alt="" style={{ width: 32, height: 32, borderRadius: 6, marginRight: 8 }} />}
              {group.podcastTitle} <span style={{ color: "#888", fontWeight: 400, fontSize: 16, marginLeft: 8 }}>({group.episodes.length} episodes)</span>
            </h3>
            {group.episodes.map(({ episode, episodeNum, key }) => (
              <div key={key} style={{ background: "#fff", borderRadius: 8, padding: 16, margin: "12px 0", display: "flex", alignItems: "center", position: 'relative' }}>
                {/* Heart icon in top right */}
                <div style={{ position: 'absolute', top: 12, right: 16, zIndex: 2 }}>
                  <FavouriteButton episodeKey={key} onToggle={fetchFavourites} />
                </div>
                <div style={{ width: 60, height: 60, background: "#eee", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                  {group.podcastImage ? <img src={group.podcastImage} alt="cover" style={{ width: 56, height: 56, borderRadius: 6, objectFit: 'cover' }} /> : 'Cover'}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#2563eb', fontWeight: 600, fontSize: 16 }}>Episode {episodeNum}:</span>
                  <span style={{ fontWeight: 700, fontSize: 18, marginLeft: 6 }}>{episode.title}</span>
                  <div style={{ color: "#888", fontSize: 14, margin: "4px 0" }}>{episode.description}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
} 