import createResourceSlice from "./createResourceSlice";

const { reducer, actions } = createResourceSlice("certification");

export const certificationReducer = reducer;
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
