import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Onboarding2(props) {
    const { lang, translations } = props;
    const { count } = useSelector((state) => state.counter);

    const list =()=>{
        return [
            {id:1,name:"Test1"},
            {id:2,name:"Test2"},
            {id:3,name:"Test3"},
        ]
    }

    const test = true

    return(
        <div>
           {
            (test===true)?(
                list().map((item,index) => (
                    <div key={index}>{item.name}</div>
                ))
            ):(
                <div></div>
            )
           
        }
        </div>
    )
}