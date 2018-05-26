import { ADD_TASK } from "../actions/taskActions";

export default function(state = [], action) {
  let newState = [...state];
  switch(action.type) {
    case ADD_TASK: {
      return action.payload.data;
    }
    default:
      return newState;
  }
}