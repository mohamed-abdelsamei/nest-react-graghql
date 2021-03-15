
// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'
import itemListReducer from '../features/itemList/itemListSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
    items: itemListReducer,
    auth:authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer