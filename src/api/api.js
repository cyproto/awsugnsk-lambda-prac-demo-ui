import axios from "axios";

const baseUrl = "https://ky24fksx07.execute-api.us-east-1.amazonaws.com/dev/";

export const getTodos = () => {
  const url = `${baseUrl}awsUgNskGetTodos`;
  return axios.get(url);
};

export const postTodo = (todo) => {
  const url = `${baseUrl}awsUgNskPostTodo`;
  return axios.post(url, todo);
};

export const deleteTodo = (todoId) => {
  const url = `${baseUrl}awsUgNskDeleteTodo/${todoId}`;
  return axios.delete(url);
};

export const updateTodo = (todo) => {
  const url = `${baseUrl}awsUgNskUpdateTodo`;
  return axios.put(url, todo);
};
