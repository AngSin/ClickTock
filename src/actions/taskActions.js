export const ADD_TASK = "ADD_TASK";
export const SET_TASKS = "SET_TASKS";

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task
  }
}

export const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    payload: tasks
  }
}