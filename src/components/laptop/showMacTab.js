import React,{memo} from "react";
import { Link, useParams } from 'react-router-dom'
import {path_img1} from '../../const'
import parse from 'html-react-parser';

const ShowMacTab =({laptops})=>{

    return(
        <div className="row" >
        <div className="col-2"></div>
        <div className="col-10">
            <div className="row height-25"></div>
            <div className="grid-container-5-cols">
                {
                    laptops.length >0?
                    laptops.map((laptop) =>(
                      <div className='prd-item flex-column w-250' key={`laptop-${laptop.latop_id}`}> 
                        <div className="prd-item-info bg-white">
                          <div className="special-laptop-label mid-mid text-only ">
                              <div className="text-center f-10 c-ff0000">
                                  <span>MỚI</span>
                              </div>
                          </div>
                          <Link to={`/laptop/${laptop.latop_id}`} className="laptop-photo" >
                              <span className="lap-image-container align-items-center d-flex">
                              <img
                                  className="laptop-image-photo"
                                  src={`${path_img1+laptop.latop_image_present}`}
                                  alt="anh ho"
                                  /> 
                              </span> 
                          </Link>
                         
                          <div className="prd-item-details flex-row relative">
                              <strong className="prd-item-name"> 
                                  <Link to= {`laptop/${laptop.latop_id}`}  className="prd-item-link" title={laptop.latop_name} >
                                      
                                  {laptop.latop_name}
                                  </Link>                                            
                              </strong>   
                                                            
                              <div className="prd-price mt-2">{ Number(laptop.attributes[0].price).toLocaleString(undefined, {minimumFractionDigits: 2}) }</div>
                              <div className="d-inline fit-box">
                                 <span className="laptop-regular-price">{ Number(laptop.attributes[0].regular_price).toLocaleString(undefined, {minimumFractionDigits: 2}) }</span>
                                 {(() => {
                                 let price = laptop.attributes[0].price
                                 let regular_price = laptop.attributes[0].regular_price
                                 let percentage = 0
                                 let tiet_kien =0 
                                 if(price !==null && price !=='' && regular_price !==null && regular_price !==''){
                                  price = parseFloat(price)
                                  regular_price = parseFloat(regular_price)
                                  tiet_kien  = regular_price - price 
                                  percentage = (tiet_kien/regular_price) * 100

                                  return <>
                                   <div className="lap-image-container align-items-center d-flex wh-80-30 absolute top--80">
                                   <div className="absolute text-tiet-kien d-flex flex-column "> 
                                        <div className="w-80px">TIẾT KIỆM</div>
                                        <div className="w-80px">{ Number(tiet_kien).toLocaleString(undefined, {minimumFractionDigits: 0}) }đ</div>
                                    </div>  
                                    <img
                                        className="tiet-kien" 
                                        src={require('../../images/tiet_kien.jpg')}
                                        alt="anh ho"
                                        /> 
                                    </div> 
                                    <span className="ms-2 laptop-regular-price">{ Number(percentage).toLocaleString(undefined, {minimumFractionDigits: 0}) }%</span>
                                  </>
                                  
                                 
                                 }
                                  
                              })()}  
                                 
                               </div> 
                              
                              
                          </div>
                          
                        </div>  
                      </div>
                    ))
                    :""
                }

            </div>
        </div>
    </div>
    )
}

export default memo(ShowMacTab);