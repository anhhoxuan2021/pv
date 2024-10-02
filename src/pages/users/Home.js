import React from 'react';
//import {FormGroup,Radio } from 'react-bootstrap';
//import ReactDOM from 'react-dom/client';

import HomeCarousel from '../../components/carousel/HomeCarousle';
import HomeMenu from '../../menu/HomeMenu';
import TabLaptop from '../../components/laptop/TabLaptops';
import TabAccessory from '../../components/laptop/TabAccessory';
import TabMac from '../../components/laptop/TabMac';
import HorizontalRight from '../../menu/HorizontalRight';
import HorizontalRightBlue from '../../menu/HorizontalRightBlue'
import HorizontalRightPink from '../../menu/HorizontalRightPink'
import HorizontalRightBlack from '../../menu/HorizontalRightBlack'

import HotPromotion from '../../components/laptop/hotPromotion'

import $ from 'jquery';

class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    //   }
    componentDidMount(){
      document.body.className = '#e9ecef';
    }
      render() {
        return (
          <div className='relative'>           
           <div className="row" >
            <div className="col">
                <HomeCarousel />
            </div>
           </div>
           <HomeMenu />
           <div className='container mt-3'>
            <HorizontalRight title="ƯU ĐÃI HOT" />
              <div className='m-t-25 mb-4 bg-white py-3'>
                  <HotPromotion />
              </div>
           </div>
           <div className='container' >
             <HorizontalRightBlue title="DANH MUC LAPTOP" />
             <div className='m-t-25'>
              <TabLaptop />
             </div>
             
           </div>  

           <div className='container m-t-25' >
             <HorizontalRightPink title="PHỤ KIỆN KHÁC" />
             <div className='m-t-25'>
              <TabAccessory />
             </div>
             
           </div>        

           <div className='container m-t-25' >
             <HorizontalRightBlack title="MAC && IPHONE" />
             <div className='m-t-25'>
              <TabMac />
             </div>
             
           </div>         
        
          </div>
         
        );
      }
}

export default Home