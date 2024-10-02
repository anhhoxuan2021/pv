import React, {useEffect,useState} from "react";
import { Link, useParams } from 'react-router-dom'

import ComponentProduct from "../../components/ComponentProduct";

import {getLaptopById} from '../../api/productService'

const AddProduct =() =>{
    let defaultData ={}
    let attDefault =[]

  return(
    <ComponentProduct data = {defaultData} attDefault ={attDefault} pageTitle ="Add Product" />   
  )
}

export default AddProduct