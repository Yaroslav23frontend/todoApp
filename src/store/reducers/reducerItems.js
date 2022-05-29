import { addItem, deleteItem } from "../action";
const initialState = {
  item: null,
  id: null,
};
export function reducerItems(state = [], action) {
  switch (action.type) {
    case addItem:
      return [
        ...state,
        {
          item: action.payload.item,
          id: action.payload.id,
        },
      ];
    case deleteItem:
      return [...state.filter((el) => el.id !== action.payload.id)];
    default:
      return state;
  }
}
