
import React, { memo, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import {seriesLaptops} from '../../api/productService'
import {path_img1} from '../../const'

import $  from "jquery";



const LaptopAttributes = ({laptopAttrs, delAttribute, addImg, numeric ,item}) => {  
//const LaptopAttributes = forwardRef((props, ref) => {
  const [rams, setRams] = useState([]);
  const [ramExisting, setRamExisting] =useState('')

    useEffect(() => {
        document.body.className = '#e9ecef';

    }, [])

    useEffect(()=> {
        seriesLaptops().then(data=>{ 
            setRams(data)
       })
        
      }, [])

      useEffect(()=>{
        setRamExisting(laptopAttrs.capacity)
      },[laptopAttrs])

    const onchangeNoThing =(e) =>{
        setRamExisting(e.target.value)
    }

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
         <Form.Label>RAM</Form.Label>
         <Form.Select  className="laptop_ram" name="capacity"  value={ramExisting  ?? ""} onChange={(e)=>onchangeNoThing(e)} >
             <option></option>
             {
                 rams.map(ram=> (
                     <option defaultValue={ram.ram_name} key={`ram_${ram.ram_id}`}
                      >{ram.ram_name}</option>
                     ))
             }
         </Form.Select>
     </div>
     </div>
     <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Color</Form.Label>
             <Form.Control type="text" className="latop_color" defaultValue={laptopAttrs?.color} />
            
         </div>
         <div className="col col-md-6">
         <Form.Label>Amount</Form.Label>
         <Form.Control type="number" className="laptop_quantity" defaultValue={laptopAttrs?.amount} />
         </div>                
     </div>
     <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Price</Form.Label>
             <Form.Control type="number" className="laptop_price" defaultValue={laptopAttrs?.price}/>
         </div>
         <div className="col col-md-6">
             <Form.Label>Regular Price</Form.Label>
             <Form.Control type="number" className="laptop_regular" defaultValue={laptopAttrs?.regular_price} />
         </div>
     </div> 
     
     <div className="row mt-3">
        <div className="col my-1 div-image  one-image">
            <label className="col text-primary text-decoration-underline add-image" style={{cursor:"pointer"}} onClick={(e)=>addImg(e)}><i>Add Present Image</i> +</label> 
            <div className="col row mt-1 slected-image">
                {   //from api
                    laptopAttrs?.image !== null && laptopAttrs?.image !== '' && laptopAttrs?.image !== undefined?
                    <div className="div-parent-100 relative library-modal">
                         <div className="absolute fs-bold delete-image-selected text-right" index={item?.fileName} 
                            title="Delete image"
                           
                            style={{top: "-10px",left:"50%" ,width:"45px", height:"45px", fontSize:"35px",
                            zIndex: "10", color: "red", cursor: "pointer"}} onClick={(e) => {selectedimage(e)}}>x</div>

                    <img className="select-image for-one" style={{cursor:"pointer"}} src= {`${path_img1+laptopAttrs?.image}`} alt="anhho" title={`${laptopAttrs?.image}`}/>
                    </div>
                    : ""
                }
          
            </div>
        </div>
        <div className="col my-1 div-image">
              <label className="my-1 col text-primary text-decoration-underline" style={{cursor:"pointer"}} onClick={(e)=>addImg(e)}><i>Add More images</i> +</label> 
              <div className="grid-container-6-cols row mt-1 slected-images">
                {  //from api
                    laptopAttrs?.more_images !==null && laptopAttrs?.more_images !=='' && laptopAttrs?.more_images !==undefined? laptopAttrs?.more_images.split(",").map((img, indx) =>(
                    <div className="div-parent-100 relative library-modal" key={`more_images_${indx}`}>
                         <div className="absolute fs-bold delete-image-selected text-right" index={item?.fileName} 
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

export default memo(LaptopAttributes)