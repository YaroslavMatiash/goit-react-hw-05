import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieDetails } from '../../tmdb-api-fetch';
import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { IoArrowBack } from 'react-icons/io5';

const defaults = {
  poster:
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2047868-eb3f-45a9-84ac-a12510bfedd9/dfaocr5-e1b71fff-5410-46ec-9941-9e94364a69a2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyMDQ3ODY4LWViM2YtNDVhOS04NGFjLWExMjUxMGJmZWRkOVwvZGZhb2NyNS1lMWI3MWZmZi01NDEwLTQ2ZWMtOTk0MS05ZTk0MzY0YTY5YTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qJPiblTPZKg-Bnhjw3QbzH98eBxk56ciWQRLvAEbniI',
  title: 'Title not found',
  date: 'XXXX-XX-XX',
  vote: 'XX.XX',
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      <Link to={goBackRef.current} className={css.goBackBtn}>
        <IoArrowBack />
        GO BACK
      </Link>
      <div className={css.movieDetails}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaults.poster
          }
          alt={movie.title || defaults.title}
        />
        <div className={css.movieInfo}>
          <h2>{movie.title}</h2>
          <p>User score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={css.genresList}>
            {movie?.genres?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h4 className={css.additionalInfoTitle}>Additional information</h4>
        <ul className={css.additionalInfoList}>
          <li>
            <NavLink to="cast" className={css.additionalInfoLink}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.additionalInfoLink}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}