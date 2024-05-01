import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productSlice from 'redux/productSlice';
import categorySlice from './categorySlice';
import userSlice from './userSlice';
import useReducer from './userSlice';
export const store = configureStore({
  reducer: {
    productStore: productSlice,
    categoryStore: categorySlice,
    userStore: userSlice,
    //user: useReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
