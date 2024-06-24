import { Movie, baseImageUrl } from "../../types";
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import "./MovieCard.scss";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <article className="c-movie">
      <div className="c-movie__favorite" onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? <Icon size={40} icon="star" /> : <Icon size={40} icon="star_outline" />}
      </div>
      <Link to={`/movie/${movie.id}`}>

        <div className="c-movie__image">
          <img height="330" width="220" src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} title={movie.title} loading="lazy" />
        </div>
        <h1 className="c-movie__title">{movie.title}</h1>
      </Link>
    </article>
  )
}

export default MovieCard