import React, {useRef, useEffect} from "react";
import UseMouseOverZoom from "../../components/fashion/UseMouseOverZoom";
import $ from 'jquery';
const path_img1 = 'http://localhost:8001/images/'

const Zoom =()=>{
    const source = useRef()
    const target = useRef()
    const cusor = useRef()
   // useRef(new UseMouseOverZoom(source, target, cusor));
    const  slice_img = '25.31.dam-thun-nu-16-22.jpg'
 // call the custom hook
    UseMouseOverZoom(source, target, cusor)
    return(
        <>
        <div className="row relative">
            <div className="col col-md-6">
                <div className="img-div h-900">
                    <img ref={source}  src={`${path_img1}/${slice_img}`} alt="Anh Ho" />
                </div>
                <div ref={cusor} className="pointer_events_none absolute border"></div>
            </div>    
            <div className="col col-md-6">
            <canvas ref = {target} className="border pointer_events_none absolute hw-300 z-index-20"></canvas>    
            </div>        
                
        </div>
        
        </>
    )
}

export default Zoom;