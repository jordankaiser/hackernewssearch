import { useSelector, useDispatch } from 'react-redux';
import { setSearches } from './SearchSlice';
import { useRef } from 'react';

export default function Search() {
  // Store dispatcher.
  const dispatch = useDispatch();

  // Reference to form text input.
  const textInput = useRef(null);

  // Get searches from state.
  const searchState = useSelector(state => state.searches);

  /**
   * Handle form submission.
   *
   * @param {SyntheticBaseEvent} event - The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure the user searched for something.
    if (textInput.current.value !== '') {
      // Get past searches and append the latest search.
      const searches = [...searchState.searches];
      searches.push(textInput.current.value);
  
      // Send searches to store.
      dispatch(setSearches(searches));
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
    </>
  )
}