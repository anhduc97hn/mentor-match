import createResourceSlice from "./createResourceSlice";

const educationSlice = createResourceSlice("education");
const experienceSlice = createResourceSlice("experience");
const certificationSlice = createResourceSlice("certification");

export const educationReducer = educationSlice.reducer;
export const experienceReducer = experienceSlice.reducer;
export const certificationReducer = certificationSlice.reducer;

export const {
  startLoading: educationStartLoading,
  hasError: educationHasError,
  reset: educationReset,
  getAllSuccess: educationGetAllSuccess,
  createSuccess: educationCreateSuccess,
  deleteSuccess: educationDeleteSuccess,
  editSuccess: educationEditSuccess,
  getAll: educationGetAll,
  create: educationCreate,
  remove: educationRemove,
  update: educationUpdate,
} = educationSlice.actions;

export const {
  startLoading: experienceStartLoading,
  hasError: experienceHasError,
  reset: experienceReset,
  getAllSuccess: experienceGetAllSuccess,
  createSuccess: experienceCreateSuccess,
  deleteSuccess: experienceDeleteSuccess,
  editSuccess: experienceEditSuccess,
  getAll: experienceGetAll,
  create: experienceCreate,
  remove: experienceRemove,
  update: experienceUpdate,
} = experienceSlice.actions;

export const {
  startLoading: certificationStartLoading,
  hasError: certificationHasError,
  reset: certificationReset,
  getAllSuccess: certificationGetAllSuccess,
  createSuccess: certificationCreateSuccess,
  deleteSuccess: certificationDeleteSuccess,
  editSuccess: certificationEditSuccess,
  getAll: certificationGetAll,
  create: certificationCreate,
  remove: certificationRemove,
  update: certificationUpdate,
} = certificationSlice.actions;
