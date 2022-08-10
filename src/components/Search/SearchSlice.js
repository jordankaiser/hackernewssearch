import { createSlice } from '@reduxjs/toolkit';

// Setup state slice.
export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searches: [],
    currentSearch: '',
    results: [],
  },
  reducers: {
    setSearches: (state, action) => {
      state.searches = action.payload;
    },
    setCurrentSearch: (state, action) => {
      state.currentSearch = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

// Export state reducer setters.
export const { setSearches, setCurrentSearch, setResults } = searchSlice.actions;

// Export state reducer.
export default searchSlice.reducer;
