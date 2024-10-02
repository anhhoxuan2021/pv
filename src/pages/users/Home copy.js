import React from 'react';
//import {FormGroup,Radio } from 'react-bootstrap';
//import ReactDOM from 'react-dom/client';

import HomeCarousel from '../../components/carousel/HomeCarousle';
import HomeMenu from '../../menu/HomeMenu';
import Laptops from '../../components/laptop/Laptops';
import HorizontalRight from '../../menu/HorizontalRight';
//import Onboarding2 from '../../components/laptop/onboarding2';
import ChartBar from '../../components/charts/ChartBar';
import ExportExlx from '../../components/export/excel/ExportExlx';
//import ExportPDFComponent from '../../components/export/pdf/ExportPDFComponent';
import ImportExcel from '../../components/export/excel/ImportExcel';

import PdfReveiw from '../../components/export/pdf/PdfReveiw';
import $ from 'jquery';
// const root = ReactDOM.createRoot(document.getElementById('root'));
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
           <div className='container'>
            <HorizontalRight title="ƯU ĐÃI HOT" />
           </div>
           <div className='container'>
             <Laptops />

             <div className='row'>
              <div className='col'>
                <ChartBar />
              </div>
             </div>

             <div className='row'>
              <div className='col'>
               <ExportExlx />
              </div>
             </div>

            {
              /* <div className='row'>
              <div className='col'>
                <ExportPDFComponent />
              </div>
             </div> */
            }

             <div className='row'>
              <div className='col'>
                <ImportExcel  />
              </div>
             </div>

             <div className='row'>
                <div className='col'>
                  <PdfReveiw />
                </div>
             </div>

           </div>           
        
          </div>
         
        );
      }
}

export default Home