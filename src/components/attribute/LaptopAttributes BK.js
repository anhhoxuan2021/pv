
import React, { memo, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import {seriesLaptops} from '../../api/productService'
import EditIcon from "../../images/edit_icon.svg"
import NoneImg from '../../images/qcode.png'
import $  from "jquery";



const LaptopAttributes = ({laptopAttrs, delAttribute, addImg, numeric ,flag, item}) => {  
//const LaptopAttributes = forwardRef((props, ref) => {
  const [rams, setRams] = useState([]);

    useEffect(() => {
        document.body.className = '#e9ecef';

    }, [])

    useEffect(()=> {
        seriesLaptops().then(data=>{ 
            setRams(data)
       })
        
      }, [])

   const handleInputLaptopAttributes =(e) => {
        console.log("")
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
         <Form.Select  className="laptop_ram" onChange={(e)=>handleInputLaptopAttributes(e)}>
             <option></option>
             {
                 rams.map(ram=> (
                     <option value={ram.ram_name} key={`ram_${ram.ram_id}`}>{ram.ram_name}</option>
                     ))
             }
         </Form.Select>
     </div>
     </div>
     <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Color</Form.Label>
             {
                flag?(
                    <Form.Control type="text" className="latop_color" defaultValue={laptopAttrs?.latop_color} onChange={(e)=>handleInputLaptopAttributes(e)}/>
                ):(
                    <Form.Control type="text" className="latop_color"/>
                )
             }
            
         </div>
         <div className="col col-md-6">
             <Form.Label>Amount</Form.Label>
             {
                flag?( <Form.Control type="number" className="laptop_quantity" defaultValue={laptopAttrs?.prd_quantity} onChange={(e)=>handleInputLaptopAttributes(e)}/>)
                : (<Form.Control type="number" className="laptop_quantity" />)
             }
            
         </div>                
     </div>
     <div className="row mt-3">
         <div className="col col-md-6">
             <Form.Label>Price</Form.Label>
             {
                flag?( <Form.Control type="number" className="laptop_price" defaultValue={laptopAttrs?.prd_price} onChange={(e)=>handleInputLaptopAttributes(e)}/>)
                :(<Form.Control type="number" className="laptop_price" />)
             }
            
         </div>
         <div className="col col-md-6">
             <Form.Label>Regular Price</Form.Label>
             {
                flag?(<Form.Control type="number" className="laptop_regular" defaultValue={laptopAttrs?.prd_regular} onChange={(e)=>handleInputLaptopAttributes(e)}/>)
                :(<Form.Control type="number" className="laptop_regular" />)
             }
             
         </div>
     </div> 
     
     <div className="row mt-3">
        <div className="col my-1 div-image  one-image">
            <label className="col text-primary text-decoration-underline add-image" style={{cursor:"pointer"}} onClick={(e)=>addImg(e)}><i>Add Present Image</i> +</label> 
            <div className="col row mt-1 slected-image"></div>
        </div>
        <div className="col my-1 div-image">
              <label className="my-1 col text-primary text-decoration-underline" style={{cursor:"pointer"}} onClick={(e)=>addImg(e)}><i>Add More images</i> +</label> 
              <div className="grid-container-6-cols row mt-1 slected-images"></div>
        </div>
     </div>
 </div>
  )
}

export default memo(LaptopAttributes)