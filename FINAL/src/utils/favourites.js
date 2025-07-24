// Utility functions for managing favourite episodes in localStorage

export function getFavourites() {
  return JSON.parse(localStorage.getItem("favouriteEpisodes") || "[]");
}

export function isFavourite(episodeKey) {
  return getFavourites().includes(episodeKey);
}

export function toggleFavourite(episodeKey) {
  let favs = getFavourites();
  if (favs.includes(episodeKey)) {
    favs = favs.filter(key => key !== episodeKey);
  } else {
    favs.push(episodeKey);
  }
  localStorage.setItem("favouriteEpisodes", JSON.stringify(favs));
} 