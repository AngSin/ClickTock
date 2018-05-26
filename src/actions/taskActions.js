import Axios from "axios";
import { ROOT_URL } from '../constants/urls';

export const ADD_TASK = "ADD_TASK";

export const addTask = (body) => {
  const url = `${ROOT_URL}/tasks`
  const payload = Axios.post(url, body);
  return {
    type: ADD_TASK,
    payload
  }
}