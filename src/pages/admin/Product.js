import React, {useEffect,useState} from "react";
import { Link, useParams } from 'react-router-dom'

import ComponentProduct from "../../components/ComponentProduct";

import {getProductById} from '../../api/productService'

const Product =() =>{
    const [laptopData, setLaptopData] = useState({})
    const [laptopAttDefault, setLaptopAttDefault] = useState([])
    const {id} = useParams()

   useEffect(() => {
    document.body.className = '#e9ecef';    
    if(id !== undefined){
        getProductById(id).then(data =>{
            let dataTemp = data
            const  attributes = data.product_attrs 
           
            if(attributes !==undefined && attributes !=null){
                if(attributes.length >0){
                    delete dataTemp.product_attrs
                    setLaptopAttDefault(attributes)
                }
            }
            setLaptopData(dataTemp)
        }) 
    }
   },[])

  return(
    <ComponentProduct id={id} data = {laptopData} attDefault ={laptopAttDefault} pageTitle ="View and Update Laptop" />   
  )
}

export default Product