import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfileSlice";
import sessionReducer from "../slices/sessionSlice";
import reviewReducer from "../slices/reviewSlice"
import { educationReducer } from "../slices/educationSlice";
import { experienceReducer } from "../slices/experienceSlice";
import { certificationReducer } from "../slices/certificationSlice";

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  session: sessionReducer,
  review: reviewReducer,
  education: educationReducer,
  experience: experienceReducer,
  certification: certificationReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;