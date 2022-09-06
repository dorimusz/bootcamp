import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as userReducer } from "./user/userSlice";
//Layout children prop

const reducers = {
  user: userReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
});

/*
//preloaded state
export const storeWithPreloadedState = (preloadeState: any) => {
  return configureStore({
    preloadedState: preloadeState || {},
    reducer: reducers,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
  });
};
*/

export type RootState = ReturnType<typeof store.getState>;
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDisptach = typeof store.dispatch;

export default store;
