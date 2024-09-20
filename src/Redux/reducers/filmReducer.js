import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    films: [],
    actors: [],
    selectedGenres: '',
    filter: 'Все',
    searchQueary: '',
    isLoggenIn: false,
}
const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
      setFilms(state, action) {
        state.films = action.payload
      },
      setFilter(state, action) {
        state.filter = action.payload
      }
    }
  })
  
  export const { setFilms, setFilter } = filmsSlice.actions
  export default filmsSlice.reducer