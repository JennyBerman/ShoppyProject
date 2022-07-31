import axios from "axios";

export const addToFavourites = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: "FAVOURITES_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
    },
  });

  localStorage.setItem(
    "favouritesItems",
    JSON.stringify(getState().favourites.favouritesItems)
  );
};

export const removeFromFavourites = (id) => (dispatch, getState) => {
  dispatch({
    type: "FAVOURITES_REMOVE_ITEM",
    payload: id,
  });
  localStorage.setItem(
    "favouritesItems",
    JSON.stringify(getState().favourites.favouritesItems)
  );
};
