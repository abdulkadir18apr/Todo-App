import { useState } from "react";
import { useTodoContext } from "./context/TodoContext";
import { deleteTodo } from "./api/apicalls";

export const TodoItem = ({ todoItem }) => {
  const [isDone, setIsDone] = useState(false);
  const { id, task, tag } = todoItem;
  const { deleteTask } = useTodoContext();
  const HandleDelete=async()=>{
    const res=await deleteTodo(id);
    console.log(res);
    if(res.success){
      deleteTask(todoItem)
      alert("Task Deleted");
    }
    else{
      alert("Something Went Wrong");
    }
  }
  return (
    <li className="todo_item" key={id}>
      <div style={{ textDecoration: isDone ? "line-through" : "" }}>
        <label>
          <input
            className="todo_item_checkbox"
            type="checkbox"
            onChange={() => setIsDone(!isDone)}
          />
          <span className="tag">{tag}</span>
          <span className="task">{task}</span>
          <button className="deleteBtn" onClick={HandleDelete}>
            <i className="fa fa-trash"></i>
          </button>
        </label>
      </div>
    </li>
  );
};
