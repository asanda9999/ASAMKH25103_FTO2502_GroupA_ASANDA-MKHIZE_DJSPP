// PodcastDetail.jsx: Displays detailed info for a single podcast, including seasons and episodes
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "../styles/PodDetail.css";
import PodcastDetailHeader from "./PodcastDetailHeader";
import SeasonSelector from "./SeasonSelector";
import SeasonDetails from "./SeasonDetails";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Genre string to title mapping
const GENRE_MAP = {
  "Personal Growth": "Personal Growth",
  "Investigative Journalism": "Investigative Journalism",
  "History": "History",
  "Comedy": "Comedy",
  "Entertainment": "Entertainment",
  "Business": "Business",
  "Fiction": "Fiction",
  "News": "News",
  "Kids and Family": "Kids and Family",
};

export default function PodcastDetail() {
  // Get the podcast ID from the URL params
  const { id } = useParams();
  // State for the podcast data
  const [show, setShow] = useState(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);
  // State for which season is selected
  const [selectedSeason, setSelectedSeason] = useState(0);

  // Fetch podcast details when component mounts or id changes
  useEffect(() => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch podcast details.");
        setLoading(false);
      });
  }, [id]);

  // Set the document title to the podcast title when data is loaded
  useEffect(() => {
    if (show && show.title) {
      document.title = show.title;
    }
  }, [show]);

  // Show loading, error, or no data states
  if (loading) return (
    <>
      <Header />
      <div className="podcast-detail-container">
        <div className="podcast-detail-header">
          <div className="podcast-detail-cover">
            <Skeleton width={200} height={200} />
          </div>
          <div className="podcast-detail-header-info">
            <h1><Skeleton width={320} height={36} /></h1>
            <p className="podcast-detail-description"><Skeleton width={400} height={22} count={2} style={{ marginBottom: 8 }} /></p>
            <div className="podcast-detail-genres">
              <Skeleton width={90} height={28} style={{ borderRadius: 16, marginRight: 12 }} count={3} inline={true} />
            </div>
            <div className="podcast-detail-stats">
              <div>
                <div className="podcast-detail-stat-label"><Skeleton width={90} height={16} /></div>
                <div><Skeleton width={70} height={18} /></div>
              </div>
              <div>
                <div className="podcast-detail-stat-label"><Skeleton width={110} height={16} /></div>
                <div><Skeleton width={90} height={18} /></div>
              </div>
              <div>
                <div className="podcast-detail-stat-label"><Skeleton width={100} height={16} /></div>
                <div><Skeleton width={80} height={18} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  if (error) return <div>{error}</div>;
  if (!show) return <div>No data found.</div>;

  // Only display mapped genres, filter out 'All' and 'Featured'
  const genres = (show.genres || [])
    .filter((g) => !["All", "Featured"].includes(g) && GENRE_MAP[g])
    .map((g) => GENRE_MAP[g]);
  // Get all seasons for the podcast
  const seasons = show.seasons || [];
  // Get the currently selected season
  const currentSeason = seasons[selectedSeason] || {};
  // Get episodes for the current season
  const episodes = currentSeason.episodes || [];

  // Render the podcast detail page with header, genre, season selector, and episodes
  return (
    <>
      <Header />
      <div className="podcast-detail-container">
        <PodcastDetailHeader show={show} genres={genres} seasons={seasons} />
        <SeasonSelector
          seasons={seasons}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
        <SeasonDetails currentSeason={currentSeason} episodes={episodes} podcastId={id} />
      </div>
    </>
  );
} 