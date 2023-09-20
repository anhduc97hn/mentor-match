import createResourceSlice from "./createResourceSlice";

const { reducer, actions } = createResourceSlice("experience");

export const experienceReducer = reducer;
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

