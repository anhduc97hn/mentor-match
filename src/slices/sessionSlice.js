import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  currentPageSessions: [],
  sessionsById: {},
  totalPages: 1,
};

const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSessionRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      console.log("payload", action.payload);
      const { sessions, count, totalPages } = action.payload;

      sessions.forEach(
        (session) => (state.sessionsById[session._id] = session)
      );
      state.currentPageSessions = sessions.map((session) => session._id);
      state.total = count;
      state.totalPages = totalPages;
    },
    sendSessionRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("payload", action.payload);
      const { sessionId, ...session } = action.payload;
      state.sessionsById[sessionId] = session;
    },

    declineRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { sessionId, ...session } = action.payload;
      state.sessionsById[sessionId] = session;
    },

    acceptRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { sessionId, ...session } = action.payload;
      state.sessionsById[sessionId] = session;
    },

    cancelRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { sessionId, ...session } = action.payload;
      state.sessionsById[sessionId] = session;
    },

    completeSessionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { sessionId, ...session } = action.payload;
      state.sessionsById[sessionId] = session;
    },

    updateSessionStatusSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { sessionId, ...session } = action.payload;
      state.sessionsById[sessionId] = session;
    },

  },
});

export default slice.reducer;

export const getRequestsSent =
  ({ filterName, page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/sessions/requests/outgoing", {
        params,
      });
      dispatch(slice.actions.getSessionRequestsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getRequestsReceived =
  ({ filterName, page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get("/sessions/requests/incoming", {
        params,
      });
      dispatch(slice.actions.getSessionRequestsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const getSessions =
  ({ status, page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { status, page, limit };
      const response = await apiService.get("/sessions", {
        params,
      });
      dispatch(slice.actions.getSessionRequestsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendSessionRequest =
  ({ userProfileId, data }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(
        `/sessions/requests/${userProfileId}`,
        data
      );
      dispatch(slice.actions.sendSessionRequestSuccess(response.data));
      toast.success("Request sent");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const declineRequest = (sessionId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/sessions/requests/${sessionId}`, {
      status: "declined",
    });
    dispatch(
      slice.actions.declineRequestSuccess(response.data)
    );
    dispatch(getSessions());
    toast.success("Request declined");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const acceptRequest = (sessionId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/sessions/requests/${sessionId}`, {
      status: "accepted",
    });
    dispatch(
      slice.actions.acceptRequestSuccess(response.data)
    );
    dispatch(getSessions());
    toast.success("Request accepted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const cancelRequest = (sessionId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/sessions/requests/${sessionId}`, {
      status: "cancelled",
    });
    dispatch(
      slice.actions.cancelRequestSuccess(response.data)
    );
    dispatch(getSessions());
    toast.success("Request cancelled");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const completeSession = (sessionId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/sessions/requests/${sessionId}`, {  status: "completed", }
    );
    dispatch(
      slice.actions.completeSessionSuccess(response.data)
    );
    dispatch(getSessions());
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSessionStatus =
  ({ sessionId, status, prevStatus }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/sessions/${sessionId}`, {
        status,
      });
      dispatch(slice.actions.updateSessionStatusSuccess(response.data));
      if (prevStatus) {
        dispatch(getSessions({ status: prevStatus }));
      }
      toast.success("Session updated");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

