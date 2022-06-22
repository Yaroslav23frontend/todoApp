import { addBoard, deleteBoard, addBoards } from "../action";

export function reducerBoards(state = [], action) {
  switch (action.type) {
    case addBoard:
      return [...state, action.payload];
    case addBoards:
      if (action.payload === undefined) {
        return [];
      }
      return [...action.payload];
    case deleteBoard:
      return [...state.filter((el) => el !== action.payload)];
    default:
      return state;
  }
}
