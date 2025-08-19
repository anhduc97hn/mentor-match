import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfileSlice";
import sessionReducer from "../slices/sessionSlice";
import reviewReducer from "../slices/reviewSlice"
import { educationReducer } from "../slices/resourceSlice";
import { experienceReducer } from "../slices/resourceSlice";
import { certificationReducer } from "../slices/resourceSlice";

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
//  devTools: process.env.NODE_ENV !== "production" && process.env.REACT_APP_REDUX_DEVTOOLS === "true",
});

export default store;