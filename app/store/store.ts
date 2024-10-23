import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import questionaireSliceReducer from './questionaireSlice';

const store = configureStore({
  reducer: {
    questionaire: questionaireSliceReducer,
  },
})

// Setup types for use throughout the app
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Set up custom hooks for convienience
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store;