import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import {getProducts, getProductID} from '../../api/productService';

import * as apiProduct from '../../api/productService'

  export const fetchLaptops = createAsyncThunk(
    "laptop/fetchLaptops",
    async (params, { rejectWithValue }) => {
        try {
          const products = await apiProduct.getLaptopsWithPagination(params);
          return products;
        } catch (err) {
          return rejectWithValue([], err);
        }
  
    }
  )

  export const fetchLaptopID = createAsyncThunk(
    "laptop/fetchLaptopID",
    async (id, { rejectWithValue }) => {
        try {
          const product = await apiProduct.getLaptopById(id);
          return product;
        } catch (err) {
          return rejectWithValue([], err);
        }
    }
  )

  //setup state
  const initialState = {
    loading:false,
    totalItems:0,
    totalPages:0,
    laptops:[],
    isFetchLaptopID:false,
    currentRequestId: "",
    laptop:{}
  };

  export const laptopSlice= createSlice({
    name: "laptop",
    initialState,
    reducers: {},

  extraReducers:(builder)=>{
    //fetchProducts
    builder.addCase(fetchLaptops.fulfilled, (state, action) => {
     state.totalItems = action.payload.totalItems;
     state.totalPages=action.payload.totalPages;
      state.laptops=action.payload.data;
      state.loading = false;
    })

    builder.addCase(fetchLaptops.pending, (state) => {
      state.loading = true;
    })
   
    builder.addCase(fetchLaptops.rejected, (state, action) => {
      state.totalItems = action.payload.totalItems;
      state.totalPages=action.payload.totalPages;
       state.laptops=action.payload.data;
      state.loading = false;
      state.error = action.error;
    })

      //fetchLaptopID
      builder.addCase(fetchLaptopID.fulfilled, (state, action) => {
        state.laptop=action.payload;
        state.loading = false;
      })

      builder.addCase(fetchLaptopID.pending, (state) => {
        state.loading = true;
      })

      builder.addCase(fetchLaptopID.rejected, (state, action) => {
        state.product=action.payload;
        state.loading = false;
        state.isShow= false;
      })
  }
  });

  export default laptopSlice.reducer;
  