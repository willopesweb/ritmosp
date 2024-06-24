import "./SearchBar.scss";
import Icon from '../Icon';

const SearchBar = () => {
  return (
    <div className="c-search">
      {/* <Icon size={30} icon="search" /> */}
      < input type="search" placeholder='Digite o que está procurando' />
    </div >

  )
}

export default SearchBar