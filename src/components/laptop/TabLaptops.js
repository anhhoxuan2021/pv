import React, {useState, useEffect, memo} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ShowLaptopTab from "./showLaptopTab";

import {getLimitLaptops} from '../../api/productService'


const TabLaptop =()=>{
    const [laptopType, setLaptopType] = useState('link-kien');
    const [laptops,setLaptops] = useState([])

    useEffect(() =>{
        getLimitLaptops({limit:5,type:'Gaming'}).then(data=>{
          setLaptops(data)
        })
    },[])

  
    const handleTab = (k) => {
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
        id="tab-laptop"
        activeKey={laptopType}
        onSelect={(k) =>handleTab(k) }
        className="tab-laptop bg-white tab-custom"
        fill
      >
        <Tab eventKey="gaming-laptop" title="LAPTOP GAMING" className="tab-laptop-content tab-items-content">
          {
             laptopType ==='gaming-laptop'? (
             <div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
             </div>) :""
          }
            
         
        </Tab>
        <Tab eventKey="ai-laptop" title="LAPTOP AI" className="tab-laptop-content tab-items-content">
          {
             laptopType ==='ai-laptop'? (
             <div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
             </div>) :""
          }
        </Tab>
        <Tab eventKey="office-laptop" title="LAPTOP VĂN PHÒNG" className="tab-laptop-content tab-items-content">
         {
             laptopType ==='office-laptop'? (
             <div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
             </div>) :""
          }
        </Tab>
        <Tab eventKey="student-laptop" title="LAPTOP SINH VIÊN" className="tab-laptop-content tab-items-content">
          {
             laptopType ==='student-laptop'? (<div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
          </div>) :""
          }
        </Tab>
        <Tab eventKey="slim-light-laptop" title="LAPTOP MỎNG NHẸ" className="tab-laptop-content tab-items-content">
        {
             laptopType ==='slim-light-laptop'? (<div className="row" >
              <div className="col"><ShowLaptopTab laptops = {laptops} /></div>
          </div>) :""
          }
        </Tab>
      </Tabs>
    )
}

export default TabLaptop