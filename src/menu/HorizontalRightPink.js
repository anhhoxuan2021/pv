import React  from 'react';
import {memo} from "react"
import { propTypes } from 'react-bootstrap/esm/Image';

const HorizontalRightPink = (props)=>{

    return(
        <div className="relative hgth-50">
            <div className="bar-b-left-pink absolute"></div>
            <div className="bar-b-right-gray  absolute"></div>
            <div className="line-b-2-gray absolute"></div>
            <div className="absolute div-center-absolute text-white p-s-33 bold text-uppercase">{ props.title }</div>
        </div>
    )
}

export default memo(HorizontalRightPink);
