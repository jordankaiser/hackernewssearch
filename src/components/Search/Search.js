import { useSelector, useDispatch } from 'react-redux';
import { setSearches } from './SearchSlice';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function Search() {
  // Store dispatcher.
  const dispatch = useDispatch();

  // Reference to form text input.
  const textInput = useRef(null);

  // Get searches from state.
  const searchState = useSelector(state => state.searches);

  // Search results.
  const [searchResults, setSearchResults] = useState([]);

  // Search results.
  const [resultsLoading, setResultsLoading] = useState(false);

  /**
   * Handle form submission.
   *
   * @param {SyntheticBaseEvent} event - The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure the user searched for something.
    if (textInput.current.value !== '') {
      dispatchSearchToStore();
    }
  };

  /**
   * Dispatch user search to store.
   */
  const dispatchSearchToStore = () => {
    // Get past searches and append the latest search.
    const searches = [...searchState.searches];
    searches.push(textInput.current.value);

    // Send searches to store.
    dispatch(setSearches(searches));
    queryAPI();
  };

  const queryAPI = () => {
    // Start loading indicator.
    setResultsLoading(true);

    // Get rep data.
    axios.get(`http://hn.algolia.com/api/v1/search?query=${textInput.current.value}`)
      .then((response) => {

        // Format response data to be used in results loop.
        const { data } = response;
        const searchResults = data.hits.map(hit => {
          return {
            title: hit.title,
            url: hit.url,
            id: hit.objectID,
          }
        });

        // Store search results in component state.
        setSearchResults(searchResults);

        // Stop loading indicator.
        setResultsLoading(false);
      })
      .catch((error) => {
        // Stop loading indicator.
        setResultsLoading(false);

        // Log error.
        console.log('Error connecting to Hacker News API.', error);
      });
  };

  const SearchResultsDisplay = () => {
    if (resultsLoading) {
      return <div>loading...</div>
    }
    else if (searchResults.length > 0) {
      return <div>results found</div>
    } else {
      return <div>Preform a search to see results.</div>
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input ref={textInput} type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div className="results">
        <SearchResultsDisplay />
      </div>
    </>
  )
}