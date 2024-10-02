import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import {getProducts, getProductID} from '../../api/productService';

import * as apiProduct from '../../api/productService'

export const fetchProfileID = createAsyncThunk(
  "profile/fetchProfileID",
  async (id, { rejectWithValue }) => {
      try {
        const products = await apiProduct.getProfileId(id);
        return products;
      } catch (err) {
        return rejectWithValue([], err);
      }

  }
)

  export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
          const products = await apiProduct.getProfile();
          return products;
        } catch (err) {
          return rejectWithValue([], err);
        }
  
    }
  )

  export const newProfile = createAsyncThunk(
    "profile/newProfile",
    async (data, { rejectWithValue }) => {
        try {
          const product = await apiProduct.newProfile(data);
          return product;
        } catch (err) {
          return rejectWithValue([], err);
        }
    }
  )

  export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (data, { rejectWithValue }) => {
        try {
          const product = await apiProduct.updateProfile(data);
          return product;
        } catch (err) {
          return rejectWithValue([], err);
        }
    }
  )

  //setup state
  const initialState = {
    loading:false,
    currentRequestId: "",

    profile:{
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

    profileID:'',
    isPermission: false,
    isRole1: false,
    isRole2: false,
    isRole3: false,
  };

  export const profileSlice= createSlice({
    name: "profile",
    initialState,
    reducers: {
      setPermission: (state, action) => {
        state.isPermission = action.payload;
      },
      setRole: (state, action) => {
        if(action.payload==="1"){
          state.isRole1 = true
          state.isRole2 = false
          state.isRole3 = false
        }else if(action.payload==="2"){
            state.isRole1 = false
            state.isRole2 = true
            state.isRole3 = false
        }else{
            state.isRole1 = false
            state.isRole2 = false
            state.isRole3 = true
        }
        state.isPermission = action.payload;
      },
    },

  extraReducers:(builder)=>{
    //fetchProfileID
    builder.addCase(fetchProfileID.fulfilled, (state, action) => {
      state.profile=action.payload;
      state.loading = false;
      if(action.payload?.role==="1"){
        state.isRole1 = true
        state.isRole2 = false
        state.isRole3 = false
      }else if(action.payload?.role==="2"){
          state.isRole1 = false
          state.isRole2 = true
          state.isRole3 = false
      }else{
          state.isRole1 = false
          state.isRole2 = false
          state.isRole3 = true
      }

      if(action.payload.permission ===1){
        state.isPermission = true;
      }else{
        state.isPermission = false;
      }
    })

    builder.addCase(fetchProfileID.pending, (state) => {
      state.loading = true;
    })
   
    builder.addCase(fetchProfileID.rejected, (state, action) => {
      state.profile=action.payload;
      state.loading = false;
      state.error = action.error;
    })

     //fetchProfile
     builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile=action.payload;
      state.loading = false;
    })

    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    })
   
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.profile=action.payload;
      state.loading = false;
      state.error = action.error;
    })

      //newProfile
      builder.addCase(newProfile.fulfilled, (state, action) => {       
        state.profileID = action.payload.id
        state.loading = false;
      })

      builder.addCase(newProfile.pending, (state) => {
        state.loading = true;
      })

      builder.addCase(newProfile.rejected, (state, action) => {
        state.profileID = action.payload?.id
        state.loading = false;
      })

      //updateProfile
      builder.addCase(updateProfile.fulfilled, (state, action) => {       
        state.profileID = action.payload.id
        state.loading = false;
      })

      builder.addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })

      builder.addCase(updateProfile.rejected, (state, action) => {
        state.profileID = action.payload?.id
        state.loading = false;
      })
  }
  });
  export const { setPermission,setRole } = profileSlice.actions
  export default profileSlice.reducer;
  