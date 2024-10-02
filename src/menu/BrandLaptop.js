import React, {useEffect, useState, memo} from "react";
import '../css/menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from 'react-bootstrap/Form';
import $ from 'jquery';

const BrandLaptop = ({filterLatopBrand}) => {   
  const [brandCollapse, setBrandCollapse] = useState(0)

   const collapseOpen =()=>{
    setBrandCollapse(1)
   }

   const collapseClose =()=>{
    setBrandCollapse(0)
   }
    return (
     <>
       <div className="row mt-2">
        <div className="col col-md-10">Thương hiệu</div>
        <div className="col col-md-2 text-right" style={{cursor:"pointer", opacity:"0.5"}}>
            {
               brandCollapse === 0? (
                <FontAwesomeIcon icon="fa-solid fa-angle-up" onClick={()=>collapseOpen()} />
               ):
               (
                <FontAwesomeIcon icon="fa-solid fa-chevron-down" onClick={()=>collapseClose()} />
               )
            }          
            
          </div>
       </div>
       <div className="row my-2 f-13">
          {
            brandCollapse === 0?(
              <div className="col">
                  <div className="row">
                    <div className="col col-md-6">
                      <Form.Check        
                        label="ACER"
                        type="checkbox"
                        name="ACER"
                        value="11"
                        onChange={(e)=>filterLatopBrand(e)} 
                      />
                    </div>
                    <div className="col col-md-6">
                      <Form.Check        
                        label="APPLE"
                        type="checkbox"
                        name="APPLE"
                        value="12"
                        onChange={(e)=>filterLatopBrand(e)} 
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-md-6">
                      <Form.Check        
                        label="ASSUS"
                        type="checkbox"
                        name="ASSUS"
                        value="5"
                        onChange={(e)=>filterLatopBrand(e)} 
                      />
                    </div>
                    <div className="col col-md-6">
                      <Form.Check        
                        label="DELL"
                        type="checkbox"
                        name="DELL"
                        value="6"
                        onChange={(e)=>filterLatopBrand(e)} 
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center my-2" onClick={()=>collapseOpen()}> 
                    <span className="c-ligh-blue" style={{cursor:"pointer"}}>Xem thêm</span>
                  </div>
              </div>
            ):(
              <div className="col">
              <div className="row">
                <div className="col">
                  <Form.Check        
                    label="ACER"
                    type="checkbox"
                    name="ACER"
                    value="11"
                    onChange={(e)=>filterLatopBrand(e)} 
                  />
                </div>                
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="APPLE"
                      type="checkbox"
                      name="APPLE"
                      value="12"
                      onChange={(e)=>filterLatopBrand(e)} 
                    />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Check        
                    label="ASSUS"
                    type="checkbox"
                    name="ASSUS"
                    value="5"
                    onChange={(e)=>filterLatopBrand(e)} 
                  />
                </div>               
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="DELL"
                      type="checkbox"
                      name="DELL"
                      value="6"
                      onChange={(e)=>filterLatopBrand(e)} 
                    />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="Laptop HP"
                      type="checkbox"
                      name="Laptop HP"
                      value="4"
                      onChange={(e)=>filterLatopBrand(e)} 
                    />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="LENOVO"
                      type="checkbox"
                      name="LENOVO"
                      value="7"
                      onChange={(e)=>filterLatopBrand(e)} 
                    />
                  </div>
              </div>
          </div>
            )
          }
       </div>
     </>
    );
  };

  export default memo(BrandLaptop);