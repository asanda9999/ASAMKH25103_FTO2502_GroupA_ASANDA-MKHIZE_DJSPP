# Podcast Explorer

A modern web application for discovering, exploring, and listening to podcasts. Built with React and Vite, it features a rich UI, global audio playback, favourites management, and advanced filtering and sorting.

---

## 🚀 Functionality Overview

- **Browse Podcasts:**
  - View a carousel of recommended shows on the homepage.
  - Filter podcasts by genre, search by title, and sort results.
  - Paginated podcast grid for easy navigation.

- **Podcast Details:**
  - Click any podcast to view detailed information, including seasons and episodes.
  - Play episodes directly from the detail page.

- **Global Audio Player:**
  - Persistent audio player at the bottom of the app for seamless listening.
  - Rewind/forward controls, episode and show info, and unload warning if audio is playing.

- **Favourites:**
  - Save your favourite episodes across all shows.
  - View, sort, and filter your favourites on a dedicated page.

- **Responsive Design:**
  - Fully responsive and mobile-friendly (breakpoint: 768px).

- **Error Handling & Loading States:**
  - Skeleton loaders and user-friendly error messages throughout the app.

---

## 🛠️ Dependencies

- [React](https://react.dev/) ^19.1.0
- [React DOM](https://react.dev/) ^19.1.0
- [React Router DOM](https://reactrouter.com/) ^7.7.1
- [React H5 Audio Player](https://github.com/lhz516/react-h5-audio-player) ^3.10.0
- [React Icons](https://react-icons.github.io/react-icons/) ^5.5.0
- [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton) ^3.5.0
- [Swiper](https://swiperjs.com/) ^11.2.10
- [Vite](https://vitejs.dev/) ^7.0.6 (for development/build)
- [ESLint](https://eslint.org/) (for linting)

### Install dependencies:
```bash
npm install
```

### Run the app locally:
```bash
npm run dev
```

---

## 📁 File Structure

```
ASAMKH25103_FTO2502_GroupA_ASANDA-MKHIZE_DJSPP/
└── FINAL/
    ├── index.html
    ├── package.json
    ├── src/
    │   ├── api/
    │   │   └── fetchPodcasts.js         # API calls for fetching podcast data
    │   ├── components/                  # All React components
    │   │   ├── Carousel.jsx             # Recommended shows carousel
    │   │   ├── EpisodeCard.jsx          # Episode display card
    │   │   ├── ErrorBoundary.jsx        # Error boundary component
    │   │   ├── FavouriteButton.jsx      # Button to favourite episodes
    │   │   ├── FavouritesPage.jsx       # Favourites management page
    │   │   ├── GenreFilter.jsx          # Genre filter UI
    │   │   ├── GlobalAudioPlayer.jsx    # Persistent audio player
    │   │   ├── Header.jsx               # App header/navigation
    │   │   ├── Pagination.jsx           # Pagination controls
    │   │   ├── PodcastCard.jsx          # Podcast display card
    │   │   ├── PodcastDetail.jsx        # Podcast detail view
    │   │   ├── PodcastDetailHeader.jsx  # Podcast detail header
    │   │   ├── PodcastGrid.jsx          # Podcast grid layout
    │   │   ├── SearchBar.jsx            # Search input
    │   │   ├── SeasonDetails.jsx        # Season/episode details
    │   │   ├── SeasonSelector.jsx       # Season selection dropdown
    │   │   ├── SortSelect.jsx           # Sorting dropdown
    │   │   └── ThemeToggle.jsx          # Theme toggle (if implemented)
    │   ├── context/                     # React context providers
    │   │   ├── AudioPlayerContext.jsx   # Audio player context
    │   │   ├── podcastConstants.js      # Podcast-related constants
    │   │   ├── PodcastContext.jsx       # Podcast data context
    │   │   └── PodcastContextInstance.js# Podcast context instance
    │   ├── data.js                      # Static data (genres, etc.)
    │   ├── styles/                      # CSS and module styles
    │   ├── utils/                       # Utility functions
    │   ├── App.jsx                      # Main app component
    │   ├── App.module.css               # App-level styles
    │   ├── index.css                    # Global styles
    │   └── main.jsx                     # App entry point
    ├── README.md
    └── ...
```

---

## 🌐 Live Demo

Add your live demo link here:

[Live Demo](#)

---

## 🧑‍💻 Examples

Here are some example usage scenarios to help you get started:

### 1. Browsing Podcasts
- On the homepage, scroll through the carousel to see recommended shows.
- Use the search bar to find podcasts by title.
- Filter by genre and sort results as needed.

### 2. Viewing Podcast Details
- Click on any podcast card to view its details, including seasons and episodes.
- Select a season to see all episodes in that season.
- Click the play button to listen to an episode.

### 3. Managing Favourites
- On any episode, click the heart icon to add it to your favourites.
- Visit the Favourites page to view, sort, and filter your saved episodes.

### 4. Using the Global Audio Player
- The audio player appears at the bottom when an episode is playing.
- Use the rewind/forward buttons and see episode/show info.

### 5. Responsive Design
- Try resizing your browser or using the app on a mobile device for a fully responsive experience.

---

#### Screenshots / GIFs

> _Add screenshots or GIFs here to showcase the app in action!_

---

## 📄 License

This project is for educational purposes. Attribution required if reused.
