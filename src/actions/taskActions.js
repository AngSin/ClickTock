export const ADD_TASK = "ADD_TASK";
export const SET_TASKS = "SET_TASKS";

export const addTask = (dateString, task) => {
  console.log(dateString);
  return {
    type: ADD_TASK,
    dateString,
    payload: task
  }
}

export const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    payload: tasks
  }
}