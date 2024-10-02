import React from 'react';
import HomeCarousel from '../../components/carousel/HomeCarousle';
import HomeMenu from '../../menu/HomeMenu';
import Products from '../../components/laptop/Products';
import HorizontalRight from '../../menu/HorizontalRight';
import $ from 'jquery';
class Home extends React.Component {

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
           <div className='container'>
            <HorizontalRight title="ƯU ĐÃI HOT" />
           </div>
           <div className='container'>
             <Products />

           </div>           
        
          </div>
         
        );
      }
}

export default Home