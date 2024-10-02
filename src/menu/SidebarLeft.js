import React, {useState} from "react";
import RangeSlider from "./RangerFilter";
import BrandLaptop from "./BrandLaptop";
import SeriesLaptop from "./SeriesLaptop";

const SidebarLeft = ()=>{
    const [listLatopBrand, setlistLatopBrand] = useState([]);
    const [listSeriesLaptop, setListSeriesLaptop] = useState([]);
    /////
    const filterLatopBrand = (e) => {
        if(e.target.checked) {
            setlistLatopBrand([...listLatopBrand, e.target.value]);
        }else{
            setlistLatopBrand(listLatopBrand.filter(item=>item!==e.target.value));
        }        
    }
    //////
    const filterSeriesLaptop = (e) => {
        if(e.target.checked) {
            setListSeriesLaptop([...listSeriesLaptop, e.target.value]);
        }else{
            setListSeriesLaptop(listSeriesLaptop.filter(item=>item!==e.target.value));
        }        
    }
   // console.log(listLatopBrand)
    return (
        <div className="min-h-700 bg-white d-flex flex-column">
            <div className="my-2 ps-3">Khoảng giá</div>
            <div className=" px-3">
              <RangeSlider />                        
            </div>
            <div className="w-100 px-3 mt-3">
                <div className=" w-100  h-1 bg-gray-200"></div>
                <div className="w-100" > 
                    <BrandLaptop filterLatopBrand={filterLatopBrand} />
                </div>
            </div>
            <div className="w-100 px-3 mt-3">
                <div className=" w-100  h-1 bg-gray-200"></div>
                <div className="w-100" > 
                    <SeriesLaptop filterSeriesLaptop={filterSeriesLaptop} />
                </div>
            </div>

            <div></div>
        </div>
    );
}

export default SidebarLeft;