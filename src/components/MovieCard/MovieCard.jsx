import { Link, useLocation } from 'react-router-dom';
import css from './MovieCard.module.css'

const defaults = {
  poster:
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2047868-eb3f-45a9-84ac-a12510bfedd9/dfaocr5-e1b71fff-5410-46ec-9941-9e94364a69a2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyMDQ3ODY4LWViM2YtNDVhOS04NGFjLWExMjUxMGJmZWRkOVwvZGZhb2NyNS1lMWI3MWZmZi01NDEwLTQ2ZWMtOTk0MS05ZTk0MzY0YTY5YTIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qJPiblTPZKg-Bnhjw3QbzH98eBxk56ciWQRLvAEbniI',
  title: 'Title not found',
};

export default function MovieCard({ movie }) {
  const location = useLocation();

  return (
    <div className={css.card}>
      <img
        className={css.poster}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : defaults.poster
        }
        alt={movie.title || defaults.title}
      />
      <div className={css.title}>
        <Link to={`/movies/${movie.id}`} state={location} className={css.movieName}>
          {movie.title || defaults.title}
        </Link>
      </div>
    </div>
  );
}