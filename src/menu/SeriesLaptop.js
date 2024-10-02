import React, {useEffect, useState, memo} from "react";
import '../css/menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Form from 'react-bootstrap/Form';
import $ from 'jquery';

const SeriesLaptop = ({filterSeriesLaptop}) => {   
  const [seriesLaptopCollapse, setSeriesLaptopCollapse] = useState(0)

   const collapseOpen =()=>{
    setSeriesLaptopCollapse(1)
   }

   const collapseClose =()=>{
    setSeriesLaptopCollapse(0)
   }
    return (
     <>
       <div className="row mt-2">
        <div className="col col-md-10">Series Laptop</div>
        <div className="col col-md-2 text-right" style={{cursor:"pointer", opacity:"0.5"}}>
            {
               seriesLaptopCollapse === 0? (
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
            seriesLaptopCollapse === 0?(
              <div className="col">
                  <div className="row">
                    <div className="col col-md-6">
                      <Form.Check        
                        label="Aero"
                        type="checkbox"
                        name="Aero"
                        value="Aero"
                        onChange={(e)=>filterSeriesLaptop(e)} 
                      />
                    </div>
                    <div className="col col-md-6">
                      <Form.Check        
                        label="Aorus"
                        type="checkbox"
                        name="Aorus"
                        value="Aorus"
                        onChange={(e)=>filterSeriesLaptop(e)} 
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-md-6">
                      <Form.Check        
                        label="Aspire"
                        type="checkbox"
                        name="Aspire"
                        value="Aspire"
                        onChange={(e)=>filterSeriesLaptop(e)} 
                      />
                    </div>
                    <div className="col col-md-6">
                      <Form.Check        
                        label="Bravo"
                        type="checkbox"
                        name="Bravo"
                        value="Bravo"
                        onChange={(e)=>filterSeriesLaptop(e)} 
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
                    label="14/15 Series"
                    type="checkbox"
                    name="14/15 Series"
                    value="14/15 Series"
                    onChange={(e)=>filterSeriesLaptop(e)} 
                  />
                </div>                
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="Aero"
                      type="checkbox"
                      name="Aero"
                      value="Aero"
                      onChange={(e)=>filterSeriesLaptop(e)} 
                    />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Check        
                    label="Aorus"
                    type="checkbox"
                    name="Aorus"
                    value="Aorus"
                    onChange={(e)=>filterSeriesLaptop(e)} 
                  />
                </div>               
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="Aspire"
                      type="checkbox"
                      name="Aspire"
                      value="Aspire"
                      onChange={(e)=>filterSeriesLaptop(e)} 
                    />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="Aspire 15"
                      type="checkbox"
                      name="Aspire 15"
                      value="Aspire 15"
                      onChange={(e)=>filterSeriesLaptop(e)} 
                    />
                  </div>
              </div>
              <div className="row">
                <div className="col">
                    <Form.Check        
                      label="Aspire 3"
                      type="checkbox"
                      name="Aspire 3"
                      value="Aspire 3"
                      onChange={(e)=>filterSeriesLaptop(e)} 
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

  export default memo(SeriesLaptop);