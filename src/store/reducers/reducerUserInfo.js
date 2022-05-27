import { addUser, deleteUser } from "../action";
const initialState = {
  email: null,
  token: null,
  id: null,
};
export function reducerUserInfo(state = initialState, action) {
  switch (action.type) {
    case addUser:
      return {
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
      };
    case deleteUser:
      return {
        email: null,
        token: null,
        id: null,
      };
    default:
      return state;
  }
}
