import { useTodoContext } from "./context/TodoContext";
import { useState } from "react";

export const AddTaskComponent = ({ date, setShowModal }) => {
  const { addTask, todolist, AddTask } = useTodoContext();

  const id = Math.floor(Math.random() * 1000);
  const [userInput, setUserInput] = useState({
    task: "",
    tag: "",
    date: date
  });
  const task = { id };
  const HandleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const HandleAddTask = () => {
    console.log(userInput);
    addTask({ ...task, ...userInput });
    // AddTask({ ...task, ...userInput });
    setShowModal(false);
    console.log(todolist);
  };
  return (
    <div className="addform">
      <button className="crossBtn" onClick={() => setShowModal(false)}>
        X
      </button>
      <label htmlFor="task" className="addform__label">
        Date
        <input
          className="addform__input"
          type="date"
          name="date"
          value={date !== "" ? date : userInput.date}
          onChange={HandleChange}
          disabled={date === "" ? false : true}
        />
      </label>
      <label htmlFor="task" className="addform__label">
        Tag
        <input
          className="addform__input"
          type="text"
          name="tag"
          value={userInput.tag}
          onChange={HandleChange}
        />
      </label>
      <label htmlFor="task">
        Task
        <input
          className="addform__input"
          type="text"
          name="task"
          value={userInput.task}
          onChange={HandleChange}
        />
      </label>
      <button className="addBtn" onClick={HandleAddTask}>
        Add
      </button>
    </div>
  );
};
