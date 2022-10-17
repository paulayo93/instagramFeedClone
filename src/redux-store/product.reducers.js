import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "./product.effects";

const initialState = {
  products: null,
  loading: false,
  error: "",
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    addFavorite: (state, { payload: { itemId } }) => {
      for (const obj of state.products) {
        if (obj.id === itemId) {
          obj.isFavorite = true;
          break;
        }
      }
    },
    removeFavorite: (state, { payload: { itemId, isFavorite } }) => {
      if (isFavorite) {
        for (const obj of state.products) {
          if (obj.id === itemId && obj.isFavorite) {
            obj.isFavorite = false;
            break;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      }
    );
  },
});

export const { addFavorite, removeFavorite } = productReducer.actions;
export default productReducer.reducer;
