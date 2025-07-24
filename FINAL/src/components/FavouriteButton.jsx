import { useState, useEffect } from "react";
import { isFavourite, toggleFavourite } from "../utils/favourites";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function FavouriteButton({ episodeKey, onToggle }) {
  const [favourite, setFavourite] = useState(isFavourite(episodeKey));

  useEffect(() => {
    setFavourite(isFavourite(episodeKey));
  }, [episodeKey]);

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
      {favourite ? <AiFillHeart color="#e25555" /> : <AiOutlineHeart color="#bbb" />}
    </button>
  );
} 