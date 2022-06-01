import { settings, resetSettings } from "../action";
export const initialState = {
  today: "yellow",
  overdue: "red",
  upcoming: "navy",
  completed: "gray",
  upcomingDays: 5,
  them: "light",
};
export function reducerSettings(state = initialState, action) {
  switch (action.type) {
    case settings:
      return {
        today: action.payload.today,
        overdue: action.payload.overdue,
        upcoming: action.payload.upcoming,
        completed: action.payload.completed,
        upcomingDays: action.payload.upcomingDays,
        them: "light",
      };
    case resetSettings:
      return initialState;
    default:
      return state;
  }
}
