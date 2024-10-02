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
  
    const Axio = axios.create({
        baseURL: config_pth,
    });


   export const getProducts = async () => {
    const { data } = await Axio.get("/todoList");
    return data;
  };

  export const getProductID = async (id) => {
    const { data } = await Axio.get("/todoList", {
      params: {
        id: id,
      }
    });
    
    return data;
  };
  

