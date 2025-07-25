import { useState, useEffect } from "react";
import { isFavourite, toggleFavourite } from "../utils/favourites";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function FavouriteButton({ episodeKey, onToggle }) {
  // State to track if this episode is a favourite
  const [favourite, setFavourite] = useState(isFavourite(episodeKey));

  // Update favourite state if episodeKey changes
  useEffect(() => {
    setFavourite(isFavourite(episodeKey));
  }, [episodeKey]);

  // Toggle favourite status and call parent callback if provided
  const handleToggle = () => {
    toggleFavourite(episodeKey);
    setFavourite(isFavourite(episodeKey));
    if (onToggle) onToggle();
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        marginLeft: 12,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 22,
        display: "flex",
        alignItems: "center"
      }}
      aria-label="Toggle Favourite"
    >
      {/* Show filled or outline heart based on favourite state */}
      {favourite ? <AiFillHeart color="#e25555" /> : <AiOutlineHeart color="#bbb" />}
    </button>
  );
} 