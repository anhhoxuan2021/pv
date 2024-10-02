import React from "react";


import ComponentLaptop from "../../components/ComponentLaptop";

import $  from "jquery";

const AddLaptop=()=>{
    let laptopData ={}
    let laptopAttDefault =[]
    return(
        <ComponentLaptop laptop = {laptopData} laptopAttDefault ={laptopAttDefault} pageTitle ="Add New Laptop" />   
      )
    }

export default AddLaptop;