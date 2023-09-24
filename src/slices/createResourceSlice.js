import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../app/apiService";
import { DATA_PER_PAGE } from "../app/config";
import { getCurrentUserProfile } from "./userProfileSlice";

// template for education, experience, certification 

const initialState = {
  isLoading: false,
  error: null,
  dataById: {},
  currentPageData: [],
};

const createResourceSlice = (resource) => {
  const slice = createSlice({
    name: resource,
    initialState,
    reducers: {
      startLoading(state) {
        state.isLoading = true;
      },
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
      reset(state) {
        state.dataById = {};
        state.currentPageData = [];
      },
      getAllSuccess(state, action) {
        state.isLoading = false;
        state.error = null;

        const { [`${resource}s`]: data, totalPages, count } = action.payload;
        data.forEach((item) => {
          state.dataById[item._id] = item;
          if (!state.currentPageData.includes(item._id)) {
            state.currentPageData.push(item._id);
          }
        });
        state.total = count;
        state.totalPages = totalPages; 
      },
      createSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const newItem = action.payload;
        if (state.currentPageData.length % DATA_PER_PAGE === 0) {
          state.currentPageData.pop();
        }
        state.dataById[newItem._id] = newItem;
        state.currentPageData.unshift(newItem._id);
      },
      deleteSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const deletedItem = action.payload;
        

        state.currentPageData = state.currentPageData.filter(
          (itemId) => itemId !== deletedItem._id
        );
        delete state.dataById[deletedItem._id];
      },
      editSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const updatedItem = action.payload;
        if (
          state.currentPageData.find((itemId) => itemId === updatedItem._id)
        ) {
          state.dataById[updatedItem._id] = updatedItem;
        }
      },
    },
  });

  const { reducer, actions } = slice;

  const getAll =
    (options = { page: 1, limit: DATA_PER_PAGE }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await apiService.get(`/${resource}s`, {
          params: options,
        });
        if (options.page === 1) dispatch(slice.actions.reset());
        dispatch(slice.actions.getAllSuccess(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };

  const create = (data) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/${resource}s`, data);
      dispatch(slice.actions.createSuccess(response.data));
      toast.success(`Create ${resource} successfully`);
      dispatch(getCurrentUserProfile());
      dispatch(getAll())
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  const remove = (itemId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/${resource}s/${itemId}`);
      dispatch(slice.actions.deleteSuccess(response.data));
      toast.success(`${resource} deleted!`);
      dispatch(getCurrentUserProfile());
      dispatch(getAll())
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  const update = ({itemId, data}) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/${resource}s/${itemId}`, data);
      dispatch(slice.actions.editSuccess(response.data));
      toast.success(`${resource} edited!`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  return {
    reducer,
    actions: {
      ...actions,
      getAll,
      create,
      remove,
      update,
    },
  };
};

export default createResourceSlice;
