import { useSelector, useDispatch } from 'react-redux';
import { setSearches, setCurrentSearch, setResults } from './SearchSlice';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function Search() {
  // Store dispatcher.
  const dispatch = useDispatch();

  // Reference to form text input.
  const textInput = useRef(null);

  // Get data from state.
  const searchState = useSelector(state => state.search);

  // Component local state.
  const [resultsLoading, setResultsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  /**
   * Handle form submission.
   *
   * @param {SyntheticBaseEvent} event - The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // React to the users search.
    if (textInput.current.value !== '') {
      initiateSearch();
    } else {
      // Empty search results and current search.
      dispatch(setResults([]));
      dispatch(setCurrentSearch(''));
    }
  };

  /**
   * Dispatch user search to store.
   */
  const initiateSearch = () => {
    // Search phrase.
    const searchPhrase = textInput.current.value;

    // Get past searches and append the latest search.
    const searches = [...searchState.searches];
    searches.push(searchPhrase);

    // Send search data to store.
    dispatch(setSearches(searches));

    // Query Hacker News API.
    queryHackerNewsAPI();
  };

  /**
   * Query the Hacker News API and responding according to it's results.
   */
  const queryHackerNewsAPI = () => {
    // Start loading indicator.
    setResultsLoading(true);

    // Get Hacker News data.
    axios.get(`http://hn.algolia.com/api/v1/search?query=${textInput.current.value}`)
      .then((response) => {

        // Get and format response data to be used in results loop.
        const { data } = response;
        const hackerNewsResults = data.hits.map(hit => {
          return {
            title: hit.title,
            url: hit.url,
            id: hit.objectID,
          }
        });

        if (hackerNewsResults.length === 0) {
          // Store lack of results.
          setNoResultsFound(true);

          // Empty search results.
          dispatch(setResults([]));
        } else {
          // Store lack of results.
          setNoResultsFound(false);

          // Store search results in state.
          dispatch(setResults(hackerNewsResults));
        }

        // Stop loading indicator.
        setResultsLoading(false);

        // Display connection error.
        setConnectionError(false);
      })
      .catch((error) => {
        // Stop loading indicator.
        setResultsLoading(false);

        // Display connection error.
        setConnectionError(true);

        // Store lack of results.
        setNoResultsFound(false);

        // Log error.
        console.log('Error connecting to Hacker News API.', error);
      });
  };

  /**
   * Dispatch the user's search to the store.
   *
   * @param {SyntheticBaseEvent} event - The onInput event.
   */
   const sendInputToStore = (event) => {
    dispatch(setCurrentSearch(event.target.value));
  };

  /**
   * Generate search results markup.
   */
  const SearchResultsDisplay = () => {
    if (connectionError) {
      return <p>There was an error contacting the Hacker News API.</p>
    }
    else if (noResultsFound) {
      return <p>No results found.</p>
    }
    else if (resultsLoading) {
      return <p>loading...</p>
    }
    else if (searchState.results.length > 0) {
      const results = searchState.results.map(result => <li key={result.id}><a href={result.url}>{result.title}</a></li>);
      return (
        <ul>
          {results}
        </ul>
      )
    } else {
      return <p>Preform a search to see results.</p>
    }
  };

  return (
    <>
      <h1>Search Hacker News</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input ref={textInput} value={searchState.currentSearch} onInput={sendInputToStore} type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <SearchResultsDisplay />
      </div>
    </>
  )
}