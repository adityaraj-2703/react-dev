// Initial State
const initialState = {
  pendingTasks: [],
  completedTasks: [],
  editId: null,
  editValue: '',
  inputValue: '',
};

//Reducer Function
function todoReducer(state=initialState, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };

    case "ADD_TODO":
      const newTask = { title: action.payload };
      return {
        ...state,
        pendingTasks: [...state.pendingTasks, newTask],
        inputValue: "",
      };

    case "DELETE_TODO":
      return {
        ...state,
        pendingTasks: state.pendingTasks.filter((item) => item.id !== action.payload),
        completedTasks: state.completedTasks.filter((item) => item.id !== action.payload),
      };

    case "EDIT_TODO":
      return {
        ...state,
        editId: action.payload.id,
        editValue: action.payload.title,
      };

    case "CANCEL_EDIT":
      return { ...state, editId: null, editValue: "" };

    case "SAVE_TODO":
      const listKey = action.payload.isCompleted ? "completedTasks" : "pendingTasks";
      return {
        ...state,
        [listKey]: state[listKey].map((item) =>
          item.id === action.payload.id
            ? { ...item, title: state.editValue }
            : item
        ),
        editId: null,
        editValue: "",
      };

    case "EDIT_VALUE":
      return { ...state, editValue: action.payload };

    case "MOVE_TO_COMPLETED":
      const task = state.pendingTasks.find((t) => t.id === action.payload);
      return {
        ...state,
        pendingTasks: state.pendingTasks.filter((t) => t.id !== action.payload),
        completedTasks: [...state.completedTasks, task],
      };

    case "MOVE_TO_PENDING":
      const backTask = state.completedTasks.find((t) => t.id === action.payload);
      return {
        ...state,
        completedTasks: state.completedTasks.filter((t) => t.id !== action.payload),
        pendingTasks: [...state.pendingTasks, backTask],
      };

    default:
      return state;
  }
}
export default todoReducer;