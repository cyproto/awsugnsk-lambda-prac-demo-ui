import Button from "./button";

import "./todo.css";

const Todo = (props) => {
  const todoTitleClass = `task-title ${
    props.todo.isCompleted ? "is-todo-completed" : ""
  }`;
  return (
    <div className="todo-wrapper">
      <div>
        <span
          className={todoTitleClass}
          onClick={props.editTodo}
          id={props.todo.id}
        >
          {props.todo.title}
        </span>
      </div>
      <div>
        <Button
          buttonName="Complete"
          onClick={props.markCompleteTodo}
          id={props.todo.id}
          className="complete-button"
          isCompleted={props.todo.isCompleted}
        ></Button>
        <Button
          buttonName="Delete"
          onClick={props.deleteTodo}
          id={props.todo.id}
          className="delete-button"
        ></Button>
      </div>
    </div>
  );
};

export default Todo;
