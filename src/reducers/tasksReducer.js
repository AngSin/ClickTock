import { ADD_TASK, SET_TASKS } from "../actions/taskActions";

export default function(state = {}, action) {
  let newState = {...state};
  switch(action.type) {
    case ADD_TASK: {
      newState[action.dateString].push(action.payload);
      return newState;
    }
    case SET_TASKS: {
      action.payload.forEach(task => {
        if (task.date) {
          if (!newState[task.date]) {
            newState[task.date] = [];
          }
          newState[task.date].push(task);
        }
      })
      return newState;
    }
    default:
      return newState;
  }
}