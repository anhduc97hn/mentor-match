import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { getSessions } from "./sessionSlice"

const initialState = {
  isLoading: false,
  error: null,
  currentPageReviewsByMentor: [],
  reviewsById: {},
  selectedReview: {},
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getReviewsPerMentorSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      console.log("payload", action.payload);
      const { reviews, count, totalPages } = action.payload;

      reviews.forEach((review) => (state.reviewsById[review._id] = review));
      state.currentPageReviewsByMentor= reviews.map((review) => review._id)
      state.totalReviewsByMentor = count;
      state.totalPages = totalPages;
    },
    getSingleReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      state.selectedReview = action.payload;
    },
    createReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const getReviewsPerMentor =
  ({ userProfileId, page, limit }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page: page,
        limit: limit,
      };
      const response = await apiService.get(
        `/userProfiles/${userProfileId}/reviews`,
        {
          params,
        }
      );
      dispatch(
        slice.actions.getReviewsPerMentorSuccess(response.data
        )
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleReview = (reviewId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/reviews/${reviewId}`);
    dispatch(
      slice.actions.getSingleReviewSuccess({
        ...response.data,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const createReview =
  ({ sessionId, content, rating, prevStatus }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/sessions/${sessionId}/reviews`, {
        content,
        rating,
      });
      dispatch(slice.actions.createReviewSuccess(response.data));
      dispatch(getSessions({ prevStatus }));
      toast.success("create review successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
