import { configureStore } from '@reduxjs/toolkit';
import popularFilmsReducer from './reducers/popularFilmsReducer';
import filmReducer from './reducers/filmReducer';
const store = configureStore({
  reducer: {
    films: filmReducer,
    popularFilms: popularFilmsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
