import { useState } from "react";
import { useTodoContext } from "./context/TodoContext";
import { deleteTodo } from "./api/apicalls";
import { Loader } from "./component/Loader";

export const TodoItem = ({ todoItem }) => {
  const [isDone, setIsDone] = useState(false);
  const { id, task, tag } = todoItem;
  const { deleteTask ,loading,setLoading} = useTodoContext();
  const HandleDelete=async()=>{
    setLoading(true);
    const res=await deleteTodo(id);
    console.log(res);
    setLoading(false);
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
      {loading && <Loader/>}
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
