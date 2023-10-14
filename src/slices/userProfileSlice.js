import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { cloudinaryUpload } from "../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  currentPageUsers: [],
  currentHomePageUsers: [],
  userProfilesById: {},
};

const slice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUserProfile = action.payload;
      state.updatedProfile = updatedUserProfile;
    },
    getUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { userProfiles, count, totalPages } = action.payload;
      userProfiles.forEach((user) => (state.userProfilesById[user._id] = user));
      state.currentPageUsers = userProfiles.map((user) => user._id);
      state.total = count;
      state.totalPages = totalPages;
    },
    getUserProfileFeaturedSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { userProfiles } = action.payload;
      userProfiles.forEach((userProfile) => (state.userProfilesById[userProfile._id] = userProfile));
      state.currentHomePageUsers = userProfiles.map((userProfile) => userProfile._id);
    },
    getSingleUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({
    name,
    avatarUrl,
    aboutMe,
    city,
    currentCompany,
    currentPosition,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        avatarUrl,
        aboutMe,
        city,
        currentCompany,
        currentPosition,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/userProfiles/me`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUserProfile =
  ({ page, limit, filter }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filter) {
        params.filter = filter;
      }
      const response = await apiService.get(`/userProfiles/`, {params});
      dispatch(slice.actions.getUserProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getUserProfileFeatured =
  ({ page, limit, filter }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/userProfiles/featured`, {
        params: { page, limit, filter },
      });
      dispatch(slice.actions.getUserProfileFeaturedSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export const getSingleUserProfile = (userProfileId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/userProfiles/${userProfileId}`);
    dispatch(slice.actions.getSingleUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/userProfiles/me");
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
