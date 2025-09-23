import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer, { updateIsAuthenticated } from './Authentication/authenticationSlice'
import jobsReducer from   "./Features/jobsSlice";
//import chatReducer from   "./Features/chatSlice";
//import alertsReducer from "./Features/alertsSlice";
import themeReducer from   "./Features/themeSlice";
export const store = configureStore({
  reducer: {
    isAuthenticated : authenticationReducer,
     jobs: jobsReducer,
    //chat: chatReducer,
    //alerts: alertsReducer,
    theme: themeReducer,
  }
})