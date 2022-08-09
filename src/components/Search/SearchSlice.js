import { createSlice } from '@reduxjs/toolkit';

// Setup state slice.
export const searchSlice = createSlice({
  name: 'results',
  initialState: {
    searches: [],
  },
  reducers: {
    setSearches: (state, action) => {
      state.searches = action.payload;
    },
  },
});

// Export state reducer setters.
export const { setSearches } = searchSlice.actions;

// Export state reducer.
export default searchSlice.reducer;
