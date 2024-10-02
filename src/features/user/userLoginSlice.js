import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import {getProducts, getProductID} from '../../api/productService';

import * as apiProduct from '../../api/productService'

export const getUserByEmail = createAsyncThunk(
  "user/getUserByEmail",
  async (email, { rejectWithValue }) => {
      try {
        const userLogin = await apiProduct.getUserByEmail(email);
        return userLogin;
      } catch (err) {
        return rejectWithValue([], err);
      }

  }
)


  //setup state
  const initialState = {
    loading:false,
    currentRequestId: "",
    userRole:'',
    userChatName:'',
    userId:'',
    userLogin:{
      id:'',
      created_at : '',
      updated_at : '',
      first_name	 : '',
      last_name : '',
      email : '',
      password : '',
      phone : '',
      remember_token : '',
      city : '',
      state : '',
      zip : '',
      address : '',
      role : '',
      avatar : '',
      permission : '',      
    },

  };

  export const userLoginSlice= createSlice({
    name: "userLogin",
    initialState,
    reducers: {
      setUserName: (state, action) => {
        state.userName = action.payload;
      },
      setUserChatName: (state, action) => {
        state.userChatName = action.payload;
      },
    
    },

  extraReducers:(builder)=>{
    //getUserByEmail
    builder.addCase(getUserByEmail.fulfilled, (state, action) => {
      state.userLogin=action.payload;
       state.userChatName = state.userName = action.payload.first_name+' '+action.payload.last_name;
       state.userRole = action.payload.role;
       state.userId = action.payload.id;
      state.loading = false;
    })

    builder.addCase(getUserByEmail.pending, (state) => {
      state.loading = true;
    })
   
    builder.addCase(getUserByEmail.rejected, (state, action) => {
      state.userLogin=action.payload;
      state.userChatName = state.userName = ''
      state.userRole ='';
      state.userId ='';
      state.loading = false;
      state.error = action.error;
    })
  }
  });
  export const { setUserChatName, setUserName } = userLoginSlice.actions
  export default userLoginSlice.reducer;
  