import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../Search/SearchSlice';

export default configureStore({
  reducer: {
    searches: searchReducer,
  },
});
