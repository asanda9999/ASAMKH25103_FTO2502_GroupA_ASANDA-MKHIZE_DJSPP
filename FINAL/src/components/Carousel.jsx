import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import PodcastCard from './PodcastCard';

export default function Carousel({ podcasts, genres, title = 'Recommended Shows' }) {
  // If no podcasts, render nothing
  if (!podcasts?.length) return null;
  return (
    <section style={{ margin: '2rem 0' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{title}</h2>
      {/* Swiper carousel for recommended shows */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
        style={{ padding: '1rem 0' }}
      >
        {/* Render a PodcastCard in each SwiperSlide */}
        {podcasts.map((podcast) => (
          <SwiperSlide key={podcast.id}>
            <PodcastCard podcast={podcast} genres={genres} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
} 