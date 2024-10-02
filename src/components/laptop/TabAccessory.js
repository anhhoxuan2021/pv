import React, {useState, useEffect, memo} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ShowLaptopTab from "./showAccessotyTab";

import {getLimitLaptops} from '../../api/productService'


const TabAccessory =()=>{
    const [laptopType, setLaptopType] = useState('linh-kiện');
    const [laptops,setLaptops] = useState([])

    useEffect(() =>{
        getLimitLaptops({limit:5,type:'Gaming'}).then(data=>{
          setLaptops(data)
        })
    },[])

  
    const handleTab = (k) => {
      console.log(k)
      let type = ''
      setLaptopType(k)
      switch (k){
        case 'ai-laptop':
           type = 'Laptop AI'
          getLimitLaptops({limit:5,type:type}).then(data=>{
            setLaptops(data)
          })
        break;
        case 'office-laptop':
           type = 'Gaming'
          getLimitLaptops({limit:5,type:type}).then(data=>{
            setLaptops(data)
          })
        break;
        case 'student-laptop':
           type = 'Học sinh - Sinh viên'
          getLimitLaptops({limit:5,type:type}).then(data=>{
            setLaptops(data)
          })
        break;
        case 'slim-light-laptop':
           type = 'Slim Light Laptop'
          getLimitLaptops({limit:5,type:type}).then(data=>{
            setLaptops(data)
          })
        break;

        default:
           type = 'Gaming'
          getLimitLaptops({limit:5,type:type}).then(data=>{
            setLaptops(data)
          })
    }
  }
 

    return(
        <Tabs 
        id="tab-accessory"
        activeKey={laptopType}
        onSelect={(k) =>handleTab(k) }
        className="tab-accessory bg-white tab-custom"
        fill
      >
        <Tab eventKey="linh-kien" title="LINH KIỆN KHÁC" className="tab-accessory-content tab-items-content">
          {
             laptopType ==='linh-kien'? (
             <div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
             </div>) :""
          }
            
         
        </Tab>
        <Tab eventKey="ai-laptop" title="LAPTOP AI" className="tab-accessory-content">
          {
             laptopType ==='ai-laptop'? (
             <div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
             </div>) :""
          }
        </Tab>
        <Tab eventKey="office-laptop" title="LAPTOP VĂN PHÒNG" className="tab-accessory-content">
         {
             laptopType ==='office-laptop'? (
             <div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
             </div>) :""
          }
        </Tab>
        <Tab eventKey="student-laptop" title="LAPTOP SINH VIÊN" className="tab-accessory-content">
          {
             laptopType ==='student-laptop'? (<div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
          </div>) :""
          }
        </Tab>
        <Tab eventKey="slim-light-laptop" title="LAPTOP MỎNG NHẸ" className="tab-accessory-content">
        {
             laptopType ==='slim-light-laptop'? (<div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
          </div>) :""
          }
        </Tab>
      </Tabs>
    )
}

export default TabAccessory