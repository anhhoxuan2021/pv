'use strict';
import axios from 'axios'
import qs from 'qs'

const config_pth = 'http://localhost:8001/'
axios.defaults.baseURL = config_pth;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
// config header
var config = {
    headers: {
        //'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
       //  'Authorization': ''
       //headers: { Accept: 'application/json', apikey: 'xxxx' },
       Accept: 'application/json'
    }
    };

var configForm ={
  headers : {
    'Content-Type' : 'multipart/form-data'
  },
}
  
    const Axio = axios.create({
        baseURL: config_pth,
        responseType: 'json',
        // timeout: 10000,
        // withCredentials: true,
        // headers: {
        //   'X-Requested-With': 'XMLHttpRequest',
        //   'Content-Type': 'application/json'
        // }
    });

  //////////////////////////////////////////////////////////
   export const getProducts = async () => {
    const { data } = await Axio.get("/api/products");
    return data;
  };
  //////////////////////////////////////////////////////////
  export const getProductID = async (id) => {
    const { data } = await Axio.get("/product/"+id, {
    });
    
    return data;
  };

   //////////////////////////////////////////////////////////
   export const getProfile = async (id) => {
    const { data } = await Axio.get("/users", {
      params: {
        id: id,
      }
    });
    
    return data;
  };

     //////////////////////////////////////////////////////////
     export const getProfileId = async (id) => {
      const { data } = await Axio.get("/user/"+id);
      
      return data;
    };

  
  //////////////////////////////////////////////////////////
  export const newProfile = async (body) =>{
    let dataPost = new FormData();
    for(let key in body){
        if( body[key] != null && Array.isArray(body[key]) ){  
            for(let i in body[key]){
              dataPost.append(key + '[]', body[key][i]);                       
            }        
        } else {
          //console.log("key= "+key+" , val= "+body[key]);
          dataPost.append(key, body[key]);    
        }  
    } 

    try
    {
        let response = await Axio(
            {
                method: 'post',
                url: '/api/save_avatar',
                data: dataPost,
                headers:
                {
                    "Content-Type": "Content-Type: multipart/form-data"
                }
            }
        );

     //   console.log('axios : ' + response); // response is received    
        return response.data;
    }
    catch (err) 
    {
        console.log(err);
    }
}

//////////////////////////////////////////////////////////
export const updateProfile = async (body) =>{
  let dataPost = new FormData();
  for(let key in body){
      if( body[key] != null && Array.isArray(body[key]) ){  
          for(let i in body[key]){
            dataPost.append(key + '[]', body[key][i]);                       
          }        
      } else {
        //console.log("key= "+key+" , val= "+body[key]);
        dataPost.append(key, body[key]);    
      }  
  } 

  try
  {
      let response = await Axio(
          {
              method: 'patch',
              url: '/up_profile',
              data: dataPost,
              headers:
              {
                  "Content-Type": "Content-Type: multipart/form-data"
              }
          }
      );

     // console.log('axios : ' + response); // response is received    
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}
//////////////////////////////////////////////////////////
export const getUserByEmail = async (email) => {
  const { data } = await Axio.get("/api/user/email/"+email);
  
  return data;
}; 

//////////////////////  
export const getProductTypes = async () => {
  const { data } = await Axio.get("/api/types/");
  
  return data;
};

export const getOptionTypes = async () => {
  const { data } = await Axio.get("/api/option-types/");
  
  return data;
};


////////////////////// 
export const getBrands = async () => {
  const { data } = await Axio.get("/api/brands/");
  
  return data;
};
////////////////////// 
export const seriesLaptops = async () => {
  const { data } = await Axio.get("/api/rams/");
 // console.log(data)
  return data;
};


  //////////////////////////////////////////////////////////
  export const uploadFiles = async (body) =>{
    let dataPost = new FormData();
   
    for(let key in body){
        if( body[key] != null && Array.isArray(body[key]) ){  
            for(let i in body[key]){  
            dataPost.append(key, body[key][i]);                    
            }        
        } else {
          dataPost.append(key, body[key]);    
        }  
    } 

    try
    {
        let response = await Axio(
            {
                method: 'post',
                url: '/api/upload-files',
                data: dataPost,
                headers:
                {
                    "Content-Type": "Content-Type: multipart/form-data"
                }
            }
        );

        console.log('axios : ' + response); // response is received    
        return response.data;
    }
    catch (err) 
    {
        console.log(err);
    }
}

//////////////////////////////////////////////////////////
export const filesUpload = async (body) =>{
  let dataPost = new FormData();
 
  for(let key in body){
      if( body[key] != null && Array.isArray(body[key]) ){  
          for(let i in body[key]){  
          dataPost.append(key, body[key][i]);                    
          }        
      } else {
        dataPost.append(key, body[key]);    
      }  
  } 

  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/files-upload',
              data: dataPost,
              headers:
              {
                  "Content-Type": "Content-Type: multipart/form-data"
              }
          }
      );

     // console.log('axios : ' + response.data.more_image); // response is received    
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

//////////////////////Laptop//////////////////////
///Library
export const getAllImagesByType = async (type) => {
  const { data } = await Axio.get("/api/get-all-images/"+type);
  
  return data;
}; 

///create Laptop
export const new_Laptop = async (para) =>{
  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/create-laptop',
              data: para,
              // headers:
              // {
              //     "Content-Type": "Content-Type: multipart/form-data"
              // }
          }
      );

   //   console.log('axios : ' + response); // response is received    
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

///create Update
export const update_Laptop = async (para) =>{
  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/update-laptop',
              data: para,
          }
      );
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

///Get laptop  by id
export const getLaptopById = async (id) => {
  const { data } = await Axio.get("/api/laptop/"+id);
  
  return data;
}; 

///Get laptops
export const getLaptops = async () => {
  const { data } = await Axio.get("/api/laptops/");
  
  return data;
}; 

///Get limit laptops
export const getLimitLaptops = async (params) => {  

  const { data } = await Axio.get("/api/laptops/"+params.limit+'/type/'+params.type);
  
  return data;
}; 

///Get laptops , 
export const getLaptopsWithPagination = async (params) => {
  const { data } = await Axio.get("/api/laptops-paginator/"+params.pageNum+'/page-size/'+params.limit);
  
  return data;
}; 

///create Product Type
export const new_ProductType = async (para) =>{
  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/create-product-type',
              data: para,
          }
      );
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

///create Product
export const new_product = async (para) =>{
  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/create-product',
              data: para,
              // headers:
              // {
              //     "Content-Type": "Content-Type: multipart/form-data"
              // }
          }
      );

   //   console.log('axios : ' + response); // response is received    
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

///create Update
export const update_product = async (para) =>{
  try
  {
      let response = await Axio(
          {
              method: 'post',
              url: '/api/update-product',
              data: para,
          }
      );
      return response.data;
  }
  catch (err) 
  {
      console.log(err);
  }
}

///Get Product  by id
export const getProductById = async (id) => {
  const { data } = await Axio.get("/api/product/"+id);
  
  return data;
}; 






