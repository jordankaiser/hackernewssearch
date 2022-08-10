import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


export default function History() {
  // Get searches from state.
  const searchState = useSelector(state => state.search);

  const SearchItemsMarkup = () => {
    // Generate list of user's searched terms.
    return searchState.searches.map((search, index) => <li key={`${index}-${search}`}>{search}</li>);
  }

  if (searchState.searches.length > 0) {
    return (
      <>
        <h1>Search History</h1>
        <ul>
          <SearchItemsMarkup />
        </ul>
      </>
    )
  } else {
    return (
      <div>No search history found. <Link to='/search'>Preform a search</Link>.</div>
    )
  }
}