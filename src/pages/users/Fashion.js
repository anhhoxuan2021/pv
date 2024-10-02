import React from 'react';
import $ from 'jquery';
//import {FormGroup,Radio } from 'react-bootstrap';
//import ReactDOM from 'react-dom/client';

import FashionComp from '../../components/fashion/Fashion'

class Fashion extends React.Component {
    // constructor(props) {
    //     super(props); #e9ecef
    //   }
    componentDidMount() {
      document.body.className = 'bg-white';
    }
      render() {
        return (
          <div className='container normal-id'>
               <FashionComp />
          </div>
         
        );
      }
}

export default Fashion