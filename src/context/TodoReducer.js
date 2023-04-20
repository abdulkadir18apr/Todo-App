export const TodoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "AddTask":
      return { task: [...state.task, payload], filtered: [] };
    case "Sort":
      const newState = {
        task: [...state.task],
        filtered: [...sortByDate(state.task)]
      };

      return newState;
    case "DeleteTask":
      return {
        task: [
          ...state.task.filter(({ id }) => (id !== payload.id ? true : false))
        ],
        filtered: []
      };
    case "Search":
      return {
        ...state,
        filtered: [
          ...state.task.filter(({ task, date, tag }) =>
            tag.toLowerCase().includes(payload.toLowerCase()) ||
            date.includes(payload) ||
            task.toLowerCase().includes(payload.toLowerCase())
              ? true
              : false
          )
        ]
      };
    case "CurrentDateTask":
      const newTask = {
        ...state,
        filtered: [
          ...state.task.filter(({ date }) =>
            date.toString() === new Date().toISOString().split("T")[0]
              ? true
              : false
          )
        ]
      };
      console.log(newTask);
      return newTask;
    case "ClearSearch":
      return { ...state, filtered: [] };
    default:
      return state;
  }
};

const sortByDate = (arr) => {
  const sortedarr = [...arr];
  return sortedarr.sort((a, b) => new Date(b.date) - new Date(a.date));
};
