// Utility functions for managing favourite episodes in localStorage

export function getFavourites() {
  // Return array of { key, added } objects
  return JSON.parse(localStorage.getItem("favouriteEpisodes") || "[]");
}

export function isFavourite(episodeKey) {
  return getFavourites().some(fav => fav.key === episodeKey);
}

export function toggleFavourite(episodeKey) {
  let favs = getFavourites();
  if (favs.some(fav => fav.key === episodeKey)) {
    favs = favs.filter(fav => fav.key !== episodeKey);
  } else {
    favs.push({ key: episodeKey, added: Date.now() });
  }
  localStorage.setItem("favouriteEpisodes", JSON.stringify(favs));
} 