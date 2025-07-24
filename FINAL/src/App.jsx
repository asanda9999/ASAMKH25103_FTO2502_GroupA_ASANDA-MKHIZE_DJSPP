import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import GenreFilter from "./components/GenreFilter";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import styles from "./App.module.css";
import React, { Suspense, lazy } from "react";
import Carousel from "./components/Carousel";
import FavouritesPage from "./components/FavouritesPage";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PodcastDetail = lazy(() => import("./components/PodcastDetail"));

/**
 * Root component of the Podcast Explorer app.
 * Handles data fetching and layout composition.
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <AudioPlayerProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className={`${styles.mainContainer} mainContainer`}>
                <section className={styles.sectionSpacing}>
                  <Carousel podcasts={podcasts.slice(0, 8)} genres={genres} title="Recommended Shows" />
                </section>
                <section className={styles.controls + ' ' + styles.sectionSpacing}>
                  <SearchBar />
                  <GenreFilter genres={genres} />
                  <SortSelect />
                </section>
                {loading && (
                  <div className={styles.messageContainer}>
                    <Skeleton height={40} width={200} style={{ marginBottom: 16 }} />
                    <Skeleton count={8} height={180} width={260} style={{ margin: 12 }} inline={true} />
                    <p style={{ marginTop: 24 }}><Skeleton width={160} /></p>
                  </div>
                )}
                {error && (
                  <div className={styles.message}>
                    <div className={styles.error}>
                      Error occurred while fetching podcasts: {error}
                    </div>
                  </div>
                )}
                {!loading && !error && (
                  <>
                    <PodcastGrid genres={genres} />
                    <Pagination />
                  </>
                )}
              </main>
            </>
          }
        />
        <Route
          path="/podcast/:id/:slug"
          element={
            <Suspense fallback={<div>Loading show details...</div>}>
              <PodcastDetail />
            </Suspense>
          }
        />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
      <GlobalAudioPlayer />
    </AudioPlayerProvider>
  );
}
