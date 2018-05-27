import { ADD_TASK, SET_TASKS } from "../actions/taskActions";

export default function(state = [], action) {
  let newState = [...state];
  switch(action.type) {
    case ADD_TASK: {
      newState.push(action.payload);
      return newState;
    }
    case SET_TASKS: {
      return action.payload;
    }
    default:
      return newState;
  }
}