import { addUser, deleteUser } from "../action";
const initialState = {
  displayName: null,
  email: null,
  token: null,
  id: null,
  emailVerified: null,
};
export function reducerUserInfo(state = initialState, action) {
  switch (action.type) {
    case addUser:
      return {
        displayName: action.payload.displayName,
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
        emailVerified: action.payload.emailVerified,
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
