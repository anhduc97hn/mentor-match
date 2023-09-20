import createResourceSlice from "./createResourceSlice";

const { reducer, actions } = createResourceSlice("education");

export const educationReducer = reducer;
export const {
  startLoading,
  hasError,
  reset,
  getAllSuccess,
  createSuccess,
  deleteSuccess,
  editSuccess,
  getAll,
  create,
  remove,
  update,
} = actions;
