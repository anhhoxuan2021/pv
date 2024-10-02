import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import {getProducts, getProductID} from '../../api/productService';

import * as apiProduct from '../../api/productService'

  export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
          const products = await apiProduct.getProducts();
          return products;
        } catch (err) {
          return rejectWithValue([], err);
        }
  
    }
  )

  export const fetchProductID = createAsyncThunk(
    "product/fetchProductID",
    async (id, { rejectWithValue }) => {
        try {
          const product = await apiProduct.getProductID(id);
          return product;
        } catch (err) {
          return rejectWithValue([], err);
        }
    }
  )

  //setup state
  const initialState = {
    loading:false,
    products:[],
    isFetchProductID:false,
    currentRequestId: "",
    product:{},
    isShow: false,
    specificImgsColor : '',
    specificImgs : '',
    productImgs :  '',
    productSize : {}
  };

  export const productSlice= createSlice({
    name: "product",
  initialState,
  reducers: {},

  extraReducers:(builder)=>{
    //fetchProducts
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
     
      state.products=action.payload;
      state.loading = false;
    })

    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
   
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products=action.payload;
      state.loading = false;
      state.error = action.error;
    })

      //fetchProductID
      builder.addCase(fetchProductID.fulfilled, (state, action) => {
        state.product=action.payload;
        state.loading = false;

        var specificImgs=[] 
          var productImgs =[] 
          var specificImgColors = [] 

          var obj=[]

          if(action.payload.prod_attr !='' && action.payload.prod_attr !=undefined && action.payload.prod_attr !=null){           
           let attributes = JSON.parse(action.payload.prod_attr)
           var objAttr = {}

           attributes.forEach((item)=>{
                    
           let flag1 = false
           let flag2 = false
           let flag3 = false
           let flag4 = false

           
           var ObjPrice={}
           var s_obj ={}
           var mObjPrice={}
           var m_obj ={}
           var l_obj ={}
           var lObjPrice={}
           var xl_obj ={}
           var xlObjPrice={}
           
           if(!isNaN(parseFloat(item.prd_s_regular_price)) || !isNaN(parseFloat(item.prd_s_price))){
             flag1 = true
             Object.assign(s_obj,!isNaN(parseFloat(item.prd_s_regular_price))? {prd_regular_price:item.prd_s_regular_price}:null,
             !isNaN(parseFloat(item.prd_s_price))? {prd_price:item.prd_s_price}:null,{amount: item.prd_size_s});
             
             Object.assign(ObjPrice,{s:s_obj})
           }

           if(!isNaN(parseFloat(item.prd_m_regular_price)) || !isNaN(parseFloat(item.prd_m_price))){
            flag1 = true
            Object.assign(m_obj,!isNaN(parseFloat(item.prd_m_regular_price))? {prd_regular_price:item.prd_m_regular_price}:null,
            !isNaN(parseFloat(item.prd_m_price))? {prd_price:item.prd_m_price}:null, {amount: item.prd_size_m});
            
            Object.assign(ObjPrice,{m:m_obj})
          }

           if(!isNaN(parseFloat(item.prd_l_regular_price)) || !isNaN(parseFloat(item.prd_l_price))){
             flag2 = true
             Object.assign(l_obj,!isNaN(parseFloat(item.prd_l_regular_price))? {prd_regular_price:item.prd_l_regular_price}:null,
            !isNaN(parseFloat(item.prd_l_price))? {prd_price:item.prd_l_price}:null,  {amount: item.prd_size_l});
           
            Object.assign(ObjPrice,{l:l_obj})
           }

           if(!isNaN(parseFloat(item.prd_xl_regular_price)) || !isNaN(parseFloat(item.prd_xl_price))){
             flag4 = true
              Object.assign(xl_obj,!isNaN(parseFloat(item.prd_xl_regular_price))? {prd_regular_price:item.prd_xl_regular_price}:null,
              !isNaN(parseFloat(item.prd_xl_price))? {prd_price:item.prd_xl_price}:null,  {amount: item.prd_size_xl});
             
              Object.assign(ObjPrice,{xl:xl_obj})
           }
            
           if(flag1 || flag2 || flag3 || flag4){
            if(item.prd_img !='' && item.prd_img !=null && item.prd_img !=undefined){
              specificImgs = [...specificImgs,...[item.prd_img]]
              let img_color = {image:item.prd_img, color: item.prd_color}
              specificImgColors = [...specificImgColors,...[img_color]]
            }else{
              specificImgs = [...specificImgs,...['unknow.png']]
              let img_color = {image:'unknow.png', color: item.prd_color}
              specificImgColors = [...specificImgColors,...[img_color]]
            } 

            if(item.addition_img !='' && item.addition_img !=null && item.addition_img !=undefined){
              productImgs = [...productImgs,...[ {addition_images: item.addition_img}]]
            }else{
              productImgs = [...productImgs,...[{addition_images:'unknow.png'}]]
            } 
           }

           obj =[...obj,...[ObjPrice]]            
           });
           
          }          
           
         // console.log(specificImgColors)
          state.isShow =true
          state.specificImgsColor = specificImgColors
          state.specificImgs = specificImgs
          state.productImgs =  productImgs
          state.productSize = obj
      })

      builder.addCase(fetchProductID.pending, (state) => {
        state.loading = true;
      })

      builder.addCase(fetchProductID.rejected, (state, action) => {
        state.product=action.payload;
        state.loading = false;
        state.isShow= false;
        state.specificImgsColor = '';
        state.specificImgs = '';
        state.productImgs =  '';
        state.productSize = {};
      })
  }
  });

  export default productSlice.reducer;
  