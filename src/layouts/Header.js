import React, { Component }  from 'react';
import {Link} from 'react-router-dom';

import * as ReactBootstrap from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const navbar = {backgroundColor: '#F16E10 !important'};

class Header extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
          isShow: false,
          valFilter:'',
          setAmountOfProduct: 0,
          userLogin:{
            first_name:'',
            last_name:'',
            id:''
          }
        };
        this.textSearChange = this.textSearChange.bind(this);
        this.search = this.search.bind(this)
        this.hiddenSearch = this.hiddenSearch.bind(this)
        this.showModalLogin = this.showModalLogin.bind(this)
      }

      textSearChange(event) {
        const target = event.target;
        //console.log("name="+value);
        this.setState({
          valFilter: target.value
       });
      }

      hiddenSearch(){
        this.setState({
          isShow:false,
          valFilter:''
        })
      }

      showModalLogin(){

      }

      search(){
        if(this.valFilter !='' && this.valFilter !=null){
          let value = {prd_name: this.valFilter}
          // productsService.searchProduct(value).then((response)=>{
          //     this.filterResult = response
          //     if(response.length >0) {
          //         this.isShow = true
          //     }else{
          //         this.isShow = false
          //     }
          //     console.log(response.length)
          // })
          this.setState({
            isShow: true
         });
      }else{
        this.setState({
          isShow: false
       });
      }
      }

  render() {
    return (
        <>
        <header className="grid items-center">
              <div id="topbar"> </div>
              <div id="headerbar">
                  <div className='container'>
                    <div className="row h-100 justify-content-md-center justify-content-sm-start align-items-center media-flex">
                      <div className="col-md-2 col-lg-2 col-sm-7 media-xs-7 force-hidden">
                        <img className="w-167" src={require('../images/logo_1.png')} alt="anh ho"/>
                      </div>
                      <div className="col-md-7 col-lg-4 col-sm-1 block-search media-xs-1 ">
                        <input value={this.state.valFilter} onChange={this.textSearChange} 
                        className= {this.state.isShow? "form-control me-2 border-dark-red media-search text-search rounded-bottom-lr-none":"form-control me-2 border-dark-red media-search text-search"}
                         type="text" placeholder="Search" aria-label="Search" />
                        {
                          (() => {
                            if (this.state.isShow){
                                return (
                                  <span className="icon-search" onClick={this.search} style={{cursor: "pointer"}}>
                                    <FontAwesomeIcon icon={['fab', 'fa-sistrix']} />                               
                               </span>
                                )
                            }else{
                              return(
                              <>
                              <span className="icon-delete" style={{cursor: "pointer"}} onClick={this.hiddenSearch}> x</span>
                                <span className="icon-back media-is-hidden hidden-force" style={{cursor: "pointer"}}>                                   
                                    <FontAwesomeIcon icon={['fas', 'fa-angle-up fa-rotate-270']} />
                                </span>
                              </>                                
                              )
                            }                          
                          })()                         
                        }
                        
                        
                       
                    </div>
                    <div className="col-md-1 col-lg-2 col-sm-1 media-xs-1 force-hidden">
                    <div className="  show-modal-login" onClick={this.showModalLogin} style={{cursor:"pointer"}}>
                      {
                        (()=>{
                          if(this.state.userLogin.id !==''){
                            return(
                              <div className="row justify-content-center align-items-center">
                              <div className="col-md-12 col-lg-3 tooltip-media" style={{cursor: 'pointer'}}>
                                  <div className="circle-size-2" >
                                      <span className="c-login-success  child-box">
                                        <FontAwesomeIcon icon={['fa', 'fa-user']} />
                                      </span>
                                  </div>
                                  <div className="box-size-media">
                                      { this.state.userLogin.first_name } { this.state.userLogin.last_name }
                                  </div>
                              </div>
                              <div className="col-md-0 col-lg-9 media-display-none" >
                                  <div className="flex flex-md-column flex-sm-row">
                                      <span className="f-12 c-777" id="user-name">{ this.state.userLogin.first_name } {this.state.userLogin.last_name }</span>
                                      <span className="f-13 bold c-777  media-ps-15 media-color-danger" style={{cursor:"pointer"}}>
                                          Sign out
                                      </span>
                                  </div>
                              </div>
                          </div>
                            )
                          }else{
                            return(
                              <div className="row justify-content-center align-items-center">
                                  <div className="col-md-12 col-lg-3">
                                      <div className="circle-size-2">
                                          <span className="fa-color-green child-box">
                                            <FontAwesomeIcon icon={['fa', 'fa-user']} />
                                          </span>
                                      </div>
                                  </div>
                                  <div className="col-md-0 col-lg-9 media-display-none" >
                                      <span className="f-12 c-777">Account &nbsp;</span>
                                      <span className="f-13 bold c-777 media-ps-15">Sign in</span>

                                  </div>
                              </div>
                            )
                          }
                        })()
                      }                         
                        </div>
                      </div>
                      <div className="col-md-1 col-lg-2 col-sm-1 media-xs-1 force-hidden">
                          <div className="row justify-content-center align-items-center">
                              <div className="col-md-12 col-lg-3 ">
                                  <Link to="/checkout/cart" className="nav-link" exact-active-class="text-success" active-class="active">
                                  <div className="circle-size-2" style={{cursor: "pointer"}}>
                                    <span className="child-box fa-color-green">
                                    <FontAwesomeIcon icon={['fas', 'fa-shopping-cart']} />
                                          <span className="counter-cicle">
                                              <span className="child-counter-cicle amount-of-product-cart">{this.state.setAmountOfProduct}</span>
                                          </span>
                                      
                                    </span>
                                  </div>
                                  </Link>
                              </div>

                              <div className="col-md-0 col-lg-9 media-display-none">
                                  <span className="f-12 c-777">Cart&nbsp;</span>
                                  <span className="f-13 bold c-777"><span className="amount-of-product-cart">{this.state.setAmountOfProduct}</span>&nbsp; Products</span>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-1 col-lg-2 col-sm-1 media-xs-1 force-hidden no_decorate">
                        <Link to="/orders" className="row justify-content-center align-items-center">
                            <div className="col-md-12 col-lg-3">
                                <div className="circle-size-2 ">
                                    <span className="fa-color-green child-box">
                                    <FontAwesomeIcon icon={['fas', 'fa-shipping-fast']} />                                      
                                    </span>
                                  
                                </div>
                            </div>

                            <div className="col-md-0 col-lg-9  media-display-none">
                                <span className="f-12 c-777">Review &nbsp;</span>
                                <span className="f-13 bold c-777">Orders</span>
                            </div>
                        </Link>
                      </div>
                      
                    </div>
                  </div>
              </div>
          </header>
        </>
    )
 }
}

export default Header;