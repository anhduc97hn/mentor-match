import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { useSelector } from "react-redux";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  userProfile: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, userProfile } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        userProfile,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userProfile: action.payload.userProfile,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userProfile: action.payload.userProfile,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userProfile: null,
      };
    case UPDATE_PROFILE:
      console.log("updated profile", action.payload)
      const {
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
        sessionCount,
        reviewCount,
        averageReviewRating,
      } = action.payload;
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
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
          sessionCount,
          reviewCount,
          averageReviewRating,
        },
      };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state.userProfile.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("/userProfiles/me");
          const userProfile = response.data;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, userProfile },
          });
        } else {
          setSession(null);

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, userProfile: null },
          });
        }
      } catch (err) {
        console.error(err);

        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            userProfile: null,
          },
        });
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);


  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { userProfile, accessToken } = response.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { userProfile },
    });
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/users/signup", {
      name,
      email,
      password,
    });

    const { userProfile, accessToken } = response.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { userProfile },
    });

    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
