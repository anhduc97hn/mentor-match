import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { DATA_PER_PAGE } from "../../app/config";
import { getCurrentUserProfile } from "./userProfileSlice";

// old.

const initialState = {
  isLoading: false,
  error: null,
  certificationById: {},
  currentPageCertification: [],
};

const slice = createSlice({
  name: "certification",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetCertification(state, action) {
      state.certificationById = {};
      state.currentPageCertification = [];
    },

    getCertificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { certifications, count } = action.payload;
      certifications.forEach((certi) => {
        state.certificationById[certi._id] = certi;
        if (!state.currentPageCertification.includes(certi._id))
          state.currentPageCertification.push(certi._id);
      });
      state.totalCertification = count;
    },

    createCertificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newCerti = action.payload;
      if (state.currentPageCertification.length % DATA_PER_PAGE === 0) {
        state.currentPageCertification.pop();
      }
      state.certificationById[newCerti._id] = newCerti;
      state.currentPageCertification.unshift(newCerti._id);
    },

    deleteCertificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // filter current certification array & remove current certi in certificationById
      const deletedCerti = action.payload;
      state.currentPageCertification = state.currentPageCertification.filter(
        (postId) => postId !== deletedCerti._id
      );
      delete state.certificationById[deletedCerti._id];
    },

    editCertificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // replace current post with updated post
      const updatedCerti = action.payload;
      if (state.currentPageCertification.find((certiId) => certiId === updatedCerti._id)) {
        state.certificationById[updatedCerti._id] = updatedCerti;
      }
    },
  },
});

export default slice.reducer;

export const getCertifications =
  ({ page = 1, limit = DATA_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/certifications`, {
        params,
      });
      if (page === 1) dispatch(slice.actions.resetCertification());
      dispatch(slice.actions.getCertificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createCertification = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/certifications", {
      ...data,
    });
    dispatch(slice.actions.createCertificationSuccess(response.data));
    toast.success("Create certfi successfully");
    dispatch(getCurrentUserProfile());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const deleteCertification = (certificationId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/certifications/${certificationId}`
    );
    dispatch(slice.actions.deleteCertificationSuccess(response.data));
    toast.success("Certification deleted!");
    dispatch(getCurrentUserProfile());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editCertification =
  ({ certificationId, data }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        `/certifications/${certificationId}`,
        {
          ...data,
        }
      );
      dispatch(slice.actions.editCertificationSuccess(response.data));
      toast.success("Certification edited!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };