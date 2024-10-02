import React, {useEffect,useState} from "react";
import { Link, useParams } from 'react-router-dom'

import ComponentLaptop from "../../components/ComponentLaptop";

import {getLaptopById} from '../../api/productService'

const Laptop =() =>{
    const [laptopData, setLaptopData] = useState({})
    const [laptopAttDefault, setLaptopAttDefault] = useState([])
    const {id} = useParams()

   useEffect(() => {
    document.body.className = '#e9ecef';    
    if(id !== undefined){
        getLaptopById(id).then(data =>{
            let dataTemp = data
            const  attributes = data.attributes 
           
            if(attributes !==undefined && attributes !=null){
                if(attributes.length >0){
                    delete dataTemp.attributes
                    setLaptopAttDefault(attributes)
                }
            }
            setLaptopData(dataTemp)
        }) 
    }
   },[])

  return(
    <ComponentLaptop latop_id={id} laptop = {laptopData} laptopAttDefault ={laptopAttDefault} pageTitle ="View and Update Laptop" />   
  )
}

export default Laptop