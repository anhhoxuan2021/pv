import React from 'react';
//import {FormGroup,Radio } from 'react-bootstrap';
//import ReactDOM from 'react-dom/client';

import HomeMenu from '../../menu/HomeMenu';
import Products from '../../components/laptop/Products';
import HorizontalRight from '../../menu/HorizontalRight';
import SidebarLeft from '../../menu/SidebarLeft';

// const root = ReactDOM.createRoot(document.getElementById('root'));
class Laps extends React.Component {
    // constructor(props) {
    //     super(props);
    //   }
    componentDidMount(){
      document.body.className = '#e9ecef';
    }
      render() {
        return (
          <div className=''>              
           <div className='container'>
            <div className='row'>
              <div className='col-md-2'>
                <SidebarLeft />
              </div>
              <div className='col-md-10'>
                <div className='row'>
                  <HorizontalRight title="ƯU ĐÃI HOT" />
                </div>
              <Products />
              </div>
            </div>
            
           </div>           
        
          </div>
         
        );
      }
}

export default Laps