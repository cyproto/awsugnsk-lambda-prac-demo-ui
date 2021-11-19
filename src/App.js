import { useEffect, useState } from "react";

import { getTodos, postTodo, updateTodo, deleteTodo } from "./api/api";

import Todo from "./components/todo";
import Button from "./components/button";

import "./App.css";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditTodo, setCurrentEditTodo] = useState({});

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = () => {
    getTodos()
      .then((res) => {
        res.data.res.sort((x, y) => {
          return x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? 1 : -1;
        });
        setTodos(res.data.res);
        const messageTimer = setTimeout(() => {
          setMessage("");
        }, 2000);
        return () => clearTimeout(messageTimer);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddNewTodo = () => {
    if (!newTodo) {
      setMessage("Title is required");
      return;
    }

    const todo = {
      title: newTodo,
    };
    postTodo(todo)
      .then((res) => {
        setMessage("Todo added successfully");
        getTodoList();
        setNewTodo("");
      })
      .catch((e) => {
        console.log(e);
        setMessage("Failed to add todo");
      });
  };

  const handleEditTodo = (event) => {
    const todo = todos.filter((todo) => {
      return todo.id === event.currentTarget.id;
    });
    setNewTodo(todo[0].title);
    setIsEditMode(true);
    setCurrentEditTodo({
      ...todo[0],
    });
  };

  const handleUpdateTodo = () => {
    updateTodo({ ...currentEditTodo, title: newTodo })
      .then((res) => {
        setMessage("Todo updated successfully");
        getTodoList();
        setNewTodo("");
        setIsEditMode(false);
      })
      .catch((e) => {
        console.log(e);
        setMessage("Failed to update todo");
      });
  };

  const handleDeleteTodo = (event) => {
    deleteTodo(event.currentTarget.id)
      .then((res) => {
        setMessage("Todo deleted successfully");
        getTodoList();
      })
      .catch((e) => {
        console.log(e);
        setMessage("Failed to delete todo");
      });
  };

  const handleMarkComplete = (event) => {
    console.log(event);
    const todo = todos.filter((todo) => {
      return todo.id === event.currentTarget.id;
    });
    updateTodo({
      ...todo[0],
      isCompleted: !todo[0].isCompleted,
    })
      .then((res) => {
        setMessage("Todo updated successfully");
        getTodoList();
        setNewTodo("");
        setIsEditMode(false);
      })
      .catch((e) => {
        console.log(e);
        setMessage("Failed to update todo");
      });
  };

  return (
    <div className="parent-container">
      <div className="insert-todo">
        <input
          className="new-todo-text-field"
          placeholder="Add new todo"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        ></input>
        {!isEditMode && (
          <Button
            buttonName="Add"
            onClick={handleAddNewTodo}
            className="add-button"
          ></Button>
        )}
        {isEditMode && (
          <Button
            buttonName="Update"
            onClick={handleUpdateTodo}
            className="update-button"
          ></Button>
        )}
      </div>
      <div className="todos-list">
        <div className="todos-title">Todos</div>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              editTodo={handleEditTodo}
              deleteTodo={handleDeleteTodo}
              markCompleteTodo={handleMarkComplete}
            ></Todo>
          );
        })}
        {!todos.length && <div className="all-done-title">All done!</div>}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default App;
