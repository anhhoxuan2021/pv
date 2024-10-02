import React  from 'react';
import {Link} from 'react-router-dom';

import * as ReactBootstrap from 'react-bootstrap';


class MainNav extends React.Component{
   
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-light bg-color-green shadow-sm">
                <div className="container">
                    <button className="navbar-toggler media-absolute top-end--75-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box"> ABOUT US</span>
                                </Link>
                            </li>
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box"> HOME</span>
                                </Link>
                            </li>
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box"> PRODUCTS</span>
                                </Link>
                                <div className="arrow"></div>
                                <div className="megamenu-dropdown " style={{borderColor: "#FFFFFF"}}>
                                    <div className="block-main bg-color-red">
                                        <div className="block-main-content">
                                            <div className="block-main-content-link">
                                                <div className="grid-child col-md-12">
                                                    <ul className="megamenu-sub-items">
                                                        <li className="megamenu-sub-item">
                                                            <Link to="/fashions" className="megamenu-item-link" style={{"--bgHove": "rgba(255, 255, 255, 0)"}}>
                                                                <span className="megamenu-item-inner"> <span className="bg-color-red yellow">Fashion</span></span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="grid-child col-md-12">
                                                    <ul className="megamenu-sub-items">
                                                        <li className="megamenu-sub-item  ">
                                                            <Link to="/laptops"  className="megamenu-item-link" style={{"--bgHove": "rgba(255, 255, 255, 0)"}}>
                                                                <span className="megamenu-item-inner">
                                                                    <span className="bg-color-red yellow">Laptops</span>
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box"> PROMOTIONS</span>
                                </Link>
                            </li>
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box">SERVICE</span>
                                </Link>
                            </li>
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box"> NEWS</span> 
                                </Link>
                            </li>
                            <li className="nav-item megamenu-item has-content">
                                <Link to="/" className="nav-link  nav-link nav-color box-size"  active-class="active">
                                    <span className="megamenu-item-inner child-box"> CONTACT</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        )
    }
}

export default MainNav;