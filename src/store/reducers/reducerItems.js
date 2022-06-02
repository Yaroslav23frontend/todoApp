import {
  addItem,
  deleteItem,
  addItems,
  completedItem,
  editItem,
} from "../action";

export function reducerItems(state = [], action) {
  switch (action.type) {
    case addItem:
      return [
        ...state,
        {
          item: action.payload.item,
          id: action.payload.id,
          completed: false,
          dueDate: dateFormat(action.payload.dueDate),
          days: numberOfDays(action.payload.dueDate),
          date: action.payload.dueDate,
        },
      ];
    case addItems:
      if (action.payload === undefined) {
        return [];
      }
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
    case editItem:
      const newState = JSON.parse(JSON.stringify(state));
      console.log(newState);
      newState[action.payload.listId] = {
        id: newState[action.payload.listId].id,
        completed: newState[action.payload.listId].completed,
        item: action.payload.item.item,
        dueDate: dateFormat(action.payload.item.dueDate),
        days: numberOfDays(action.payload.item.dueDate),
        date: action.payload.item.dueDate,
      };
      console.log(newState);
      return newState;
    case deleteItem:
      return [...state.filter((el) => el.id !== action.payload)];

    default:
      return state;
  }
}
function getDayOfYear(date = new Date()) {
  const timestamp1 = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

  const differenceInMilliseconds = timestamp1 - timestamp2;

  const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

  return differenceInDays;
}
export function numberOfDays(_date) {
  const date = new Date();
  const dueDate = new Date(_date);
  const numberOfDayCurrent = getDayOfYear(date);
  const numberOfDayDue = getDayOfYear(dueDate);
  const dueDateObject = {
    month: dueDate.getMonth(),
    day: dueDate.getDate(),
    year: dueDate.getFullYear(),
  };
  const dateObject = {
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getFullYear(),
  };
  if (_date !== "") {
    return numberOfDayDue - numberOfDayCurrent;
  }
  return "";
}
export function dateFormat(date) {
  const tempDate = new Date(date);
  const dateObject = {
    month: tempDate.getMonth(),
    day: tempDate.getDate(),
    year: tempDate.getFullYear(),
  };
  return `${dateObject.day}/${
    dateObject.month + 1 < 10
      ? `0${dateObject.month + 1}`
      : dateObject.month + 1
  }/${dateObject.year}`;
}
