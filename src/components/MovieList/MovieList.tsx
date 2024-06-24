import MovieCard from '../MovieCard/MovieCard';
import { Movie } from '../../types';
import "./MovieList.scss"

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="c-movies">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList;