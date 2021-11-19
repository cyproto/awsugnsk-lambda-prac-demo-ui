import "./button.css";
import {
  MdDelete,
  MdAddCircle,
  MdUpdate,
  MdCheckCircle,
  MdCheckCircleOutline,
} from "react-icons/md";

const Button = (props) => {
  const className = `${props.className} button`;
  return (
    <button className={className} onClick={props.onClick} id={props.id}>
      {(props.buttonName === "Add" || props.buttonName === "Update") && (
        <span style={{ marginRight: "5px" }}>{props.buttonName}</span>
      )}
      {props.buttonName === "Delete" && <MdDelete />}
      {props.buttonName === "Add" && <MdAddCircle />}
      {props.buttonName === "Update" && <MdUpdate />}
      {props.buttonName === "Complete" && props.isCompleted && (
        <MdCheckCircle />
      )}
      {props.buttonName === "Complete" && !props.isCompleted && (
        <MdCheckCircleOutline />
      )}
    </button>
  );
};

export default Button;
