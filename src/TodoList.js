import { useState,useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { useTodoContext } from "./context/TodoContext";
import { AddTaskComponent } from "./AddTaskComponent";
import { useNavigate } from "react-router-dom";
import { fetchTodo } from "./api/apicalls";

export const TodoList = () => {
  const {
    todolist,
    filterByDate,
    filteredList,
    searchTask,
    currentTask,
    clearSearch,
    setTodo
  } = useTodoContext();
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState(false);
  let [clickedDate, setClickedDate] = useState("");
  const [active, setactive] = useState("");

  const displayTodoObj = !filter
    ? todolist.reduce((acc, item) => {
        if (!acc[item.date]) {
          return { ...acc, [item.date]: [item] };
        } else {
          acc[item.date].push(item);
          return acc;
        }
      }, {})
    : filteredList.reduce((acc, item) => {
        if (!acc[item.date]) {
          return { ...acc, [item.date]: [item] };
        } else {
          acc[item.date].push(item);
          return acc;
        }
      }, {});
  console.log("rerendering.........");
  const HandleTaskClick = (e) => {
    setShowModal(true);
    setClickedDate(e.target.value);
  };
  const HandleSort = () => {
    if (!filter) {
      filterByDate();
    }
    console.log(todolist);
    setFilter(!filter);
  };
  const HandleSearch = (e) => {
    if (e.target.value !== "") {
      searchTask(e.target.value);
      setFilter(true);
    } else {
      clearSearch();
      setFilter(false);
    }
  };
  const HandleTaskForToday = (date) => {
    if (!filter) {
      currentTask();
      setFilter(true);
    } else {
      clearSearch();
      setFilter(false);
    }
  };
  const HandleLogout=()=>{
    localStorage.clear();
    navigate("/")
  }

  const getUserTodos=async()=>{
    const res=await fetchTodo();
    if(res.success){
      setTodo(res.todos)
    }
    else{
      alert("Something went Wrong");
      navigate("/")
    }
  }
  useEffect(()=>{
    getUserTodos();
  },[])
  return (
    <div className="todo">
      <nav className="filter">
        <div className="mobile">
          <i
            className="fa-solid fa-bars"
            onClick={() => setactive(active === "active" ? "" : "active")}
          ></i>
        </div>
        <div className={`filter_items ${active}`}>
          <button className="filter_btn" value="" onClick={HandleTaskClick}>
            Add new Date
          </button>
          <button className="filter_btn" value="" onClick={HandleTaskForToday}>
            Tasks for Today
          </button>
          <button className="filter_btn" onClick={HandleSort}>
            Sort By Date
          </button>
          <input
            className="filter__input"
            type="text"
            placeholder="  Search"
            onChange={HandleSearch}
          />
          <button className="filter_btn" onClick={HandleLogout}>
           Logout
          </button>
        </div>
      </nav>
      {showModal && (
        <div className="modal-container" style={{}}>
          <AddTaskComponent date={clickedDate} setShowModal={setShowModal} />
        </div>
      )}

      <div className="cardContainer">
        {Object.keys(displayTodoObj).map((date) => (
          <div className="todoCard">
            <div className="todoCard__header">
              <button value={date} onClick={HandleTaskClick}>
                +
              </button>
              <h1>{date}</h1>
            </div>

            <ul>
              {displayTodoObj &&
                displayTodoObj[date].map((todoItem) => (
                  <TodoItem todoItem={todoItem} />
                ))}
            </ul>
            {showModal && (
              <div className="modal-container" style={{}}>
                <AddTaskComponent
                  date={clickedDate}
                  setShowModal={setShowModal}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
