import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice';
import counterReducer from "../features/product/counter";
import profileSlice from '../features/user/profileSlice';
import userLoginSlice from '../features/user/userLoginSlice';
import laptopSlice from '../features/laptop/laptopSlice';

export default configureStore({
reducer: {
    product: productReducer,
    counter: counterReducer,
    profile:profileSlice,
    userLogin: userLoginSlice,
    laptop: laptopSlice
},

});