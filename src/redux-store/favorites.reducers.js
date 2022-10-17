import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "./product.effects";

const initialState = {
  favorites: null,
  length: 0,
};

// add favorites
// remove favorites

const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {

    // addFavorite: (state, { payload: { id } }) => {
    //     console.log("log add favorite  ", state)
    // },
    // removeFavorite: (state, { payload: { id } }) => {
    //     console.log("log remove favorite   ", state)
    // },
  }
});

export const { addFavorite, removeFavorite } = favoritesReducer.actions;
export default favoritesReducer.reducer;
