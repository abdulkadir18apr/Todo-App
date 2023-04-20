import { createContext, useContext, useReducer } from "react";
import { TodoDb } from "./TodoDb";

import { TodoReducer } from "./TodoReducer";
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, {
    task: [...TodoDb],
    filtered: []
  });
  return (
    <TodoContext.Provider
      value={{
        todolist: state.task,
        filteredList: state.filtered,
        filterByDate: () => dispatch({ type: "Sort" }),
        addTask: (todoItem) => dispatch({ type: "AddTask", payload: todoItem }),
        deleteTask: (todoItem) =>
          dispatch({ type: "DeleteTask", payload: todoItem }),
        searchTask: (searchValue) =>
          dispatch({ type: "Search", payload: searchValue }),
        currentTask: () => dispatch({ type: "CurrentDateTask" }),
        clearSearch: () => dispatch({ type: "ClearSearch" })
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export const useTodoContext = () => useContext(TodoContext);

//ToDo REducer
