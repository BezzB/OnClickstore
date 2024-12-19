import React, { useState, useEffect } from 'react';
import MovieCard from '../../common/MovieCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import { tmdbService } from '../../../services/tmdb.service';
import './TVShowsPage.scss';

export const TVShowsPage = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getAllTVShows();
        setShows(data);
      } catch (error) {
        setError('Error fetching TV shows');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const loadMore = () => {
    setDisplayCount(prev => prev + 20);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="tv-shows-page">
      <div className="container">
        <h1>TV Shows</h1>
        <div className="shows-grid">
          {shows.slice(0, displayCount).map(show => (
            <MovieCard
              key={show.id}
              movie={{
                ...show,
                title: show.name,
                release_date: show.first_air_date
              }}
            />
          ))}
        </div>
        {displayCount < shows.length && (
          <button className="load-more" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}; 