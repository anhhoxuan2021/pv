import React from 'react';
import { useState } from "react";
import {memo} from "react";
import {Link} from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/menu.css';
import $ from 'jquery';

import RightMenu from './RightMenu';

class HomeMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colm1: '',
            colm2: '',
            colm3: '',
            colm4: '',
            colm5: '',
            menuList1: [],
            menuList2: [],
            menuList3: [],
            menuList4: [],
            menuList5: [],
            menuListLeft: [
                {  title: 'Laptop', link: 'laptops',image:'laptop.jpg' },
                {  title: 'Apple', link: 'apple',image:'apple.jpg' },
                {  title: 'Ipad', link: 'ipad',image:'ipad.png' },
                {  title: 'PC Máy để bàn', link: 'desktop',image:'desktop.png' },
                {  title: 'Màn hình', link: 'screen',image:'screen.png' },
                {  title: 'Main boards', link: 'mainboard',image:'mainboard.png' },
                {  title: 'Phụ kiện máy tính', link: 'pcAccessory',image:'pcAccessory.png' },
                {  title: 'Gaming gear', link: 'gaming_gear',image:'gaminggear.png' },
                {  title: 'Điện thoại di động', link: 'phones',image:'handset.png' },    
                {  title: 'Thiết bị âm thanh', link: 'sound',image:'earphone.png' },
                {  title: 'Thiết bị văn phòng', link: 'printer',image:'printer.png' },
                {  title: 'Điện máy', link: 'screen',image:'electric.png' },
                {  title: 'Điện máy gia dụng', link: 'screen',image:'electricAppliances.png' },
                
            ],
           isShow:false,
        }

        this.menuLeftHover = this.menuLeftHover.bind(this);
        this.menuLeftMouseOut = this.menuLeftMouseOut.bind(this);
        this.menuRightHover = this.menuRightHover.bind(this);
        this.menuRightMouseOut = this.menuRightMouseOut.bind(this);

        }

        menuRightHover(){
            this.setState({isShow: true});
        }

        menuRightMouseOut(){
            this.setState({isShow: false});
        }

        menuLeftHover(type) {
            if(type === 'lap'){
                this.setState(
                    {
                        isShow: true,
                        colm1: 'Thương hiệu',
                        colm2: 'Nhu cầu',
                        colm3: 'Kích thước',
                        colm4: 'Cấu hình',
                        colm5: 'Mức giá',
                        
                        menuList1: [
                            { title: 'Acer', link: '/laptop/acer',isClass:false },
                            { title: 'Asus', link: '/laptop/asus',isClass:false },
                            { title: 'Dell', link: '/laptop/dell',isClass:false },
                            { title: 'HP', link: '/laptop/hp',isClass:false },
                            {  title: 'Lenovo', link: '/laptop/lenovo',isClass:false },
                            { title: 'LG Gram', link: '/laptop/lcgram',isClass:false },
                            { title: 'MSI', link: '/laptop/msi',isClass:false },
                            { title: 'Gigabyte', link: '/laptop/gigabyte',isClass:false },
                        ],
                        menuList2: [
                            { title: 'Laptop gaming', link: '/laptop/for_gaming',isClass:false },
                            { title: 'Laptop đồ họa', link: '/laptop/for_graphics',isClass:false },
                            { title: 'Laptop AI', link: '/laptop/for_ai',isClass:false },
                            { title: 'Laptop sinh viên', link: '/laptop/for_student',isClass:false },
                            {  title: 'Laptop văn phòng', link: '/laptop/for_office',isClass:false },
                            { title: 'Laptop cảm ứng', link: '/laptop/for_touch_screen',isClass:false },
                            { title: 'Laptop mỏng nhẹ', link: '/laptop/for_thin',isClass:false },
                            { title: 'Laptop workstation', link: '/laptop/for_workstation',isClass:false },
                        ],
                        menuList3: [
                            { title: 'Dưới 13 inch', link: '/laptop/under_13inch',isClass:false },
                            { title: '13 dến 15 ich', link: '/laptop/13_to_15inch',isClass:false },
                            { title: 'Trên 15 inch', link: '/laptop/over_15inch',isClass:false },
                            { title: 'Laptop 13 inch', link: '/laptop/13inch',isClass:false },
                            { title: 'Laptop 14 inch', link: '/laptop/14inch',isClass:false },
                            { title: 'Laptop 15 inch', link: '/laptop/15inch',isClass:false },
                            { title: 'Laptop 16 inch', link: '/laptop/16inch',isClass:false },
                            { title: 'Laptop 17 inch', link: '/laptop/17inch',isClass:false },
                        ],
                        menuList4: [
                           
                            { title: 'Laptop i5', link: '/laptop/laptop_i5',isClass:false },
                            { title: 'Laptop i7', link: '/laptop/laptop_i7',isClass:false },
                            { title: 'Laptop i9', link: '/laptop/laptop_i9',isClass:false },
                            { title: 'Laptop Ryzen 5', link: '/laptop/laptop_ryzen_5',isClass:false },
                            { title: 'Laptop Ryzen 7', link: '/laptop/laptop_ryzen_7',isClass:false },
                            { title: 'Laptop Ultra 5', link: '/laptop/laptop_ultra_5',isClass:false },
                            { title: 'Laptop Ultra 7', link: '/laptop/laptop_ultra_7',isClass:false },
                            { title: 'Laptop Ultra 9', link: '/laptop/laptop_ultra_9',isClass:false },
                        ],
                        menuList5: [
                            { title: 'Dưới 10 triệu', link: '/laptop/laptop_under_15_millions',isClass:false },
                            { title: '10 - 15 triệu', link: '/laptop/laptop_10_15_millions',isClass:false },
                            { title: '15 - 20 triệu', link: '/laptop/laptop_15_20_millions',isClass:false },
                            { title: '20 - 25 triệu', link: '/laptop/laptop_20_25_millions',isClass:false },
                            { title: '25 - 30 triệu', link: '/laptop/laptop_25_30_millions',isClass:false },
                            { title: 'Trên 30 triệu', link: '/laptop/laptop_over_30_millions',isClass:false },
                        ],
                        
    
                    }
                )
            }else if(type ==='apple'){
                this.setState(
                    {
                        isShow: true,
                        colm1: 'Macbook',
                        colm2: 'Iphone',
                        colm3: 'Ipad',
                        colm4: 'Cấu hình',
                        colm5: 'Phụ kiện apple',
                        menuList1: [
                            { title: 'Macbook Air', link: '/laptop/macbook_air',isClass:false },
                            { title: 'MacBook Pro', link: '/laptop/macbook_pro',isClass:false },
                        ],
                        menuList2: [
                            { title: 'iPhone 14 series', link: '/laptop/iPhone_14',isClass:false },
                            { title: 'iPhone 15 series', link: '/laptop/iPhone_15',isClass:false },
                            
                            
                        ],
                        menuList3: [
                            { title: 'iPad Pro', link: '/laptop/iPad_Pro',isClass:false },
                            { title: 'iPad Air', link: '/laptop/iPad_Air',isClass:false },
                            { title: 'iPad Mini', link: '/laptop/iPad_Mini',isClass:false },
                            { title: 'iPad Gen Series', link: '/laptop/iPad_Gen_Series',isClass:false },
                        ],
                        menuList4: [
                            { title: 'iMac', link: '/laptop/iMac',isClass:false },
                            { title: 'Mac mini', link: '/laptop/mac_mini',isClass:false },                        
                        ],
                        menuList5: [
                            { title: 'Apple Watch', link: '/laptop/apple_watch',isClass:false },
                            { title: 'Củ sạc & Cáp sạc', link: '/laptop/apple_adapter',isClass:false },
                            { title: 'Tai nghe Apple', link: '/laptop/apple_earphone',isClass:false },
                            { title: 'Bàn phím, chuột & bút', link: '/laptop/apple_keyboard',isClass:false },
                            { title: 'Apple TV', link: '/laptop/apple_tv',isClass:false },
                            { title: 'Airtag', link: '/laptop/apple_air',isClass:false },
                        ],
    
                    }
                )
            }
            
            
           
        }

        menuLeftMouseOut(){
          this.setState({
            isShow: false
                       
          })
        }
    

      render() {
        return (
        <div className='row'>
            <div className='col menu-top-position'>
                <div className="outer-container">  
                    <div className='row'>
                        <div className='col col-md-2 p-t-2 pe-0'>
                        <div className='home-menu'>
                        {
                                this.state.menuListLeft.map((item,index)=>{
                                    return(
                                        <Link to={`/${item.link}`} className="row none-under"
                                        onMouseOver={()=>this.menuLeftHover(item.link)} onMouseOut={()=>this.menuLeftMouseOut()}
                                        key={index}
                                        >
                                            <div className='row justify-content-center align-items-center a-hover'>
                                                <div className="col-md-3 pe-0 ">
                                                    <div className="parent-box">
                                                        <span className="child-box">
                                                        <img
                                                            className="d-block w-24"
                                                            src={require(`../images/icon/${item.image}`)}
                                                            alt="anh ho"
                                                            />                                 
                                                        </span>
                                                    
                                                    </div>
                                                </div>

                                                <div className="col-md-9 ps-0">
                                                    <span>{item.title}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                                
                            </div>
                        </div>
                        <div className='col col-md-10 p-t-2 px-0'>
                            <div className={this.state.isShow?"home-menu-right flex-container":"home-menu-right flex-container hidden" }
                            onMouseOver={()=>this.menuRightHover()}
                            onMouseOut={()=>this.menuRightMouseOut()}
                            >
                                <div className=''>
                                    <div className="row menu-title-right pt-3">
                                        <div className='row align-items-center'>
                                            <div className="col pe-0">
                                                <span>{this.state.colm1}</span>
                                            </div>
                                        </div>
                                    </div>  
                                    <RightMenu  lists={this.state.menuList1}/>
                                </div>
                                <div className=''>
                                    <div className="row menu-title-right pt-3">
                                        <div className='row  align-items-center'>
                                            <div className="col pe-0">
                                                <span>{this.state.colm2}</span>
                                            </div>
                                        </div>
                                    </div>  
                                    <RightMenu  lists={this.state.menuList2}/>
                                </div>
                                <div className=''>
                                    <div className="row menu-title-right pt-3">
                                        <div className='row  align-items-center'>
                                            <div className="col pe-0">
                                                <span>{this.state.colm3}</span>
                                            </div>
                                        </div>
                                    </div>  
                                    <RightMenu  lists={this.state.menuList3}/>
                                </div>
                                <div className=''>
                                    <div className="row menu-title-right pt-3">
                                        <div className='row  align-items-center'>
                                            <div className="col pe-0">
                                                <span>{this.state.colm4}</span>
                                            </div>
                                        </div>
                                    </div>  
                                    <RightMenu  lists={this.state.menuList4}/>                                
                                </div>
                                <div className=''>
                                    <div className="row menu-title-right pt-3">
                                        <div className='row  align-items-center'>
                                            <div className="col pe-0">
                                                <span>{this.state.colm5}</span>
                                            </div>
                                        </div>
                                    </div>  
                                    <RightMenu  lists={this.state.menuList5}/>
                                </div>
                            </div>
                        </div>
                    </div>             
                    
                </div>
            </div>
        </div>
         
        );
      }
}

export default memo(HomeMenu)