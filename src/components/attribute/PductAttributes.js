
import React, { memo, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import {seriesLaptops} from '../../api/productService'
import {path_img1} from '../../const'

import $  from "jquery";



const PductAttributes = ({deFaultAttrs, delAttribute, addImg, numeric ,item}) => {  
//const LaptopAttributes = forwardRef((props, ref) => {
 

    useEffect(() => {
        document.body.className = '#e9ecef';

    }, [])

   const selectedimage = (e) => {
      $(e.target).closest('.library-modal').remove()
    
   }

  return (
  <div className="mb-3 attr-row">
  <div className="row">
    <div className="col"><label className="fw-bold text-success text-decoration-underline">Attribute {numeric}.</label></div>
    <div className="col text-right"><label className="fw-bold text-danger" onClick={()=>delAttribute(item.id)}>X</label></div>
  </div>

  <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Product SKU</Form.Label>
             <Form.Control type="text" className="p_sku" defaultValue={deFaultAttrs?.p_sku} />
            
         </div>                
     </div>

     <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Color</Form.Label>
             <Form.Control type="text" className="p_color" defaultValue={deFaultAttrs?.p_attr_color} />
            
         </div>
         <div className="col col-md-6">
         <Form.Label>Amount</Form.Label>
         <Form.Control type="number" className="p_quantity" defaultValue={deFaultAttrs?.p_attr_amount} />
         </div>                
     </div>
     <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Price</Form.Label>
             <Form.Control type="number" className="p_price" defaultValue={deFaultAttrs?.p_attr_price}/>
         </div>
         <div className="col col-md-6">
             <Form.Label>Regular Price</Form.Label>
             <Form.Control type="number" className="p_regular" defaultValue={deFaultAttrs?.p_attrr_egular_price} />
         </div>
     </div> 
     
     <div className="row mt-3">
        <div className="col my-1 div-image  one-image">
            <label className="col text-primary text-decoration-underline add-image" style={{cursor:"pointer"}} onClick={(e)=>addImg(e)}><i>Add Present Image</i> +</label> 
            <div className="col row mt-1 slected-image">
                {   //from api
                    deFaultAttrs?.p_attr_image !== null && deFaultAttrs?.p_attr_image !== '' && deFaultAttrs?.p_attr_image !== undefined?
                    <div className="div-parent-100 relative library-modal">
                         <div className="absolute fs-bold delete-image-selected text-right" index={item?.id} 
                            title="Delete image"
                           
                            style={{top: "-10px",left:"50%" ,width:"45px", height:"45px", fontSize:"35px",
                            zIndex: "10", color: "red", cursor: "pointer"}} onClick={(e) => {selectedimage(e)}}>x</div>

                    <img className="select-image for-one" style={{cursor:"pointer"}} src= {`${path_img1+deFaultAttrs?.p_attr_image}`} alt="anhho" title={`${deFaultAttrs?.p_attr_image}`}/>
                    </div>
                    : ""
                }
          
            </div>
        </div>
        <div className="col my-1 div-image">
              <label className="my-1 col text-primary text-decoration-underline" style={{cursor:"pointer"}} onClick={(e)=>addImg(e)}><i>Add More images</i> +</label> 
              <div className="grid-container-6-cols row mt-1 slected-images">
                {  //from api
                    deFaultAttrs?.p_attr_more_images !==null && deFaultAttrs?.p_attr_more_images !=='' && deFaultAttrs?.p_attr_more_images !==undefined? 
                    deFaultAttrs?.p_attr_more_images.split(",").map((img, indx) =>(
                    <div className="div-parent-100 relative library-modal" key={`more_images_${indx}`}>
                         <div className="absolute fs-bold delete-image-selected text-right" index={item?.id} 
                            title="Delete image"
                           
                            style={{top: "-10px",left:"50%" ,width:"45px", height:"45px", fontSize:"35px",
                            zIndex: "10", color: "red", cursor: "pointer"}} onClick={(e) => {selectedimage(e)}} >x</div>
                        <img className="select-image for-many" style={{cursor:"pointer"}}  src={`${path_img1+img}`} alt="item" title={`${img}`} />
                   </div>
                    )) :""
                }
              </div>
        </div>
     </div>
 </div>
  )
}

export default memo(PductAttributes)