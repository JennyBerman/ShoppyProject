export const favouritesReducer = (state = { favouritesItems: [] }, action) => {
  switch (action.type) {
    case "FAVOURITES_ADD_ITEM":
      const item = action.payload;

      const existItem = state.favouritesItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          favouritesItems: state.favouritesItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          favouritesItems: [...state.favouritesItems, item],
        };
      }

    case "FAVOURITES_REMOVE_ITEM":
      return {
        ...state,
        favouritesItems: state.favouritesItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
