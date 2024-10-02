import React, {useState, useEffect, memo} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ShowMacTab from "./showMacTab";

import {getLimitLaptops} from '../../api/productService'


const TabMac =()=>{
    const [laptopType, setLaptopType] = useState('gaming-laptop');
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
        id="tab-mac"
        activeKey={laptopType}
        onSelect={(k) =>handleTab(k) }
        className="tab-mac bg-white tab-custom"
        fill
      >
        <Tab eventKey="gaming-laptop" title="LAPTOP GAMING" className="tab-mac-content tab-items-content">
          {
             laptopType ==='gaming-laptop'? (
             <div className="row" >
              <div className="col"><ShowMacTab laptops = {laptops} /></div>
             </div>) :""
          }
            
         
        </Tab>
        <Tab eventKey="ai-laptop" title="LAPTOP AI" className="tab-mac-content tab-items-content">
          {
             laptopType ==='ai-laptop'? (
             <div className="row" >
              <div className="col"><ShowMacTab laptops = {laptops} /></div>
             </div>) :""
          }
        </Tab>
        <Tab eventKey="office-laptop" title="LAPTOP VĂN PHÒNG" className="tab-mac-content tab-items-content">
         {
             laptopType ==='office-laptop'? (
             <div className="row" >
              <div className="col"><ShowMacTab laptops = {laptops} /></div>
             </div>) :""
          }
        </Tab>
        <Tab eventKey="student-laptop" title="LAPTOP SINH VIÊN" className="tab-mac-content tab-items-content">
          {
             laptopType ==='student-laptop'? (<div className="row" >
              <div className="col"><ShowMacTab laptops = {laptops} /></div>
          </div>) :""
          }
        </Tab>
        <Tab eventKey="slim-light-laptop" title="LAPTOP MỎNG NHẸ" className="tab-mac-content tab-items-content">
        {
             laptopType ==='slim-light-laptop'? (<div className="row" >
              <div className="col"><ShowMacTab laptops = {laptops} /></div>
          </div>) :""
          }
        </Tab>
      </Tabs>
    )
}

export default memo(TabMac)