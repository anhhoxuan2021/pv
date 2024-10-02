import React from 'react';
import $ from 'jquery';
//import {FormGroup,Radio } from 'react-bootstrap';
//import ReactDOM from 'react-dom/client';

import FashionCompZoom from '../../components/fashion/FashionCompZoom'

class FashionZoom extends React.Component {
    // constructor(props) {
    //     super(props); #e9ecef
    //   }
    componentDidMount() {
      document.body.className = 'bg-white';
    }
      render() {
        return (
          <div className='container normal-id'>
               <FashionCompZoom />
          </div>
         
        );
      }
}

export default FashionZoom