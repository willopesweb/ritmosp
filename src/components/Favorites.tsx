import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoriteSlice';
import { Movie } from '../types';

const Favorites = ({ movie }) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite(movie));
  }

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(movie.id));
  }

  return (
    <div>
      <button onClick={handleAddFavorite}>Adicionar aos Favoritos</button>
      <button onClick={handleRemoveFavorite}>Remover dos Favoritos</button>
    </div>
  )
}

export default Favorites