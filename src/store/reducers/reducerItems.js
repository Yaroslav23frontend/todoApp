import { addItem, deleteItem, addItems, completedItem } from "../action";

export function reducerItems(state = [], action) {
  switch (action.type) {
    case addItem:
      return [
        ...state,
        {
          item: action.payload.item,
          id: action.payload.id,
          completed: false,
        },
      ];
    case addItems:
      return [...action.payload];
    case completedItem:
      const data = JSON.parse(JSON.stringify(state));
      console.log(data);
      return [
        ...data.map((el) => {
          if (el.id === action.payload.id) {
            el.completed = action.payload.completed;
          }
          return el;
        }),
      ];
    case deleteItem:
      return [...state.filter((el) => el.id !== action.payload)];
    default:
      return state;
  }
}
