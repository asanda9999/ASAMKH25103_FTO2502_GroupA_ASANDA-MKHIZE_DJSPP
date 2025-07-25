import { formatDate } from "../utils/formatDate";
import styles from "../styles/PodcastCard.module.css";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

// PodcastCard component displays a summary card for a podcast.
// - Shows image, title, seasons, genres, and last updated date.
// - The whole card is a clickable link to the podcast's detail page.
export default function PodcastCard({ podcast, genres }) {
  // Map genre IDs to their titles using the genres array
  const genreSpans = podcast.genres.map((id) => {
   
    const match = genres.find((genre) => genre.id === id); 
    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  return (
    // The Link component makes the whole card clickable and navigates to the podcast's detail page
   
    <Link to={`/podcast/${podcast.id}/${slugify(podcast.title)}`} className={styles.cardLink}>
      <div className={`${styles.card} card`}>
        {/* Podcast image and title */}
        <img src={podcast.image} alt={podcast.title} />
        <h3>{podcast.title}</h3>
        {/* Number of seasons */}
        <p className={`${styles.seasons} seasons`}>
          {podcast.seasons} seasons
        </p>
        {/* Genre tags */}
        <div className={styles.tags}>{genreSpans}</div>
        {/* Last updated date */}
        <p className={`${styles.updatedText} updatedText`}>
          Updated {formatDate(podcast.updated)}
        </p>
      </div>
    </Link>
  );
}
