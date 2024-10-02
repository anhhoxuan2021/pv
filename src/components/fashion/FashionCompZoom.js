import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { fetchProductID } from '../../features/product/productSlice';
import parse from 'html-react-parser';
import ShowSpecificImgColor from './ShowSpecificImgColor'
import FashionItemZoom from './FashionItemZoom'

const mapStateToProps = (state) => ({
    product: state.product.product,
    isShow: state.product.isShow,
    specificImgsColor: state.product.specificImgsColor,
    specificImgs: state.product.specificImgs,
    productImgs: state.product.productImgs,
    productSize: state.product.productSize,
  });
  
  //const mapDispatchToProps = { fetchProductID };
  const mapDispatchToProps = { fetchProductID };

  class FashionCompZoom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            indx: 0,
            indexSize:'',
            prd_regular_price: '',
            prd_price: '',
            amount: 0,
            product_size: '',
            isShow: false,
            firstLoad: false,
            sizeSelected:'s',
            firstProductImages:''
        };

       // this.firstProductImages = this.firstProductImages.bind(this);
        this.firstZise = this.firstZise.bind(this);
        this.sizeChanged = this.sizeChanged.bind(this)
        this.productImageIndex = this.productImageIndex.bind(this)
    }
    //////
    productImageIndex=(index)=>{      
        this.setState({indx: index,
          firstProductImages: this.props.productImgs[index].addition_images,
          sizeSelected:'s',
          indexSize: 's'
        });  

        
      }
    //////
    sizeChanged=(size)=>{
        this.setState({indexSize:size, firstLoad:true,sizeSelected:size});
        
    }    
      //////
      indexSizeChanged = (productSize,indexSize,indx,flag)=>{
        let item = productSize[indx]
         let size=''
        if(flag){
            for (let x in item){
                size = x
              break    
             } 
        }else{
            size = indexSize
        }

        if(size !==''){
             let temp = item[size] 
             let product_size =''                 
             if(size ==='s'){
               product_size = 'Small'
             }else if(size ==='m'){
               product_size = 'Medium'
             }else if(size ==='l'){
               product_size = 'Large'
             }else{
               product_size = 'XLarge'
             }                  
             
            return {
                product_size: product_size, 
                //indexSize: size,
               // isShow: true,
                prd_regular_price: temp.prd_regular_price,
                prd_price: temp.prd_price,
                amount: temp.amount,
              //  firstProductImages: temp.addition_images
            }
             
           }else{
            return null; 
           }
      }
      /////
      componentDidMount(){
        var id = window.location.href.split('/')[window.location.href.split('/').length - 1]; 
       
         this.props.fetchProductID(id)
      }
      /////
    static getDerivedStateFromProps(nextProps, prevState) { 
		if(nextProps.isShow !== prevState.isShow){ 
     // if(nextProps !== prevState){ 
            let item = nextProps.productSize[prevState.indx]
            // console.log(item)
            let size=''
            for (let x in item){
               size = x
             break    
            } 

            if(size !==''){                
                 let temp = item[size] 
                 let product_size =''                 
                 if(size ==='s'){
                   product_size = 'Small'
                 }else if(size ==='m'){
                   product_size = 'Medium'
                 }else if(size ==='l'){
                   product_size = 'Large'
                 }else{
                   product_size = 'XLarge'
                 }                  
                 
                return {
                    product_size: product_size, 
                    indexSize: size,
                    isShow: true,
                    prd_regular_price: temp.prd_regular_price,
                    prd_price: temp.prd_price,
                    amount: temp.amount,
                    firstProductImages: nextProps.productImgs[prevState.indx].addition_images
                }
                 
               }else{
                return null; 
               }
             }

		return null; // No change to state 
	} 
    /////
    componentDidUpdate(prevProps, prevState){     
          if(this.state.indexSize !== prevState.indexSize && this.state.firstLoad){
          console.log("componentDidUpdate")
           let state1 = this.indexSizeChanged(prevProps.productSize,this.state.indexSize,this.state.indx,false)
           this.setState(state1)
        }
    }

     ///// 
     firstZise=(indx)=>{      
      let item = this.props.productSize[indx]
      let zises =[] 
      for(let x in item){
       zises = [...zises,x]
      }

      if(zises.length > 0){
          return (
              <>
              <div className="col">
                  <div className="f-15" >Select size: <strong>{this.state.product_size}</strong></div>
                      <div className="d-flex flex-row  fit-box pb-3 mt-3">
                          {
                              zises.map((size, index)=>(
                                  size===this.state.sizeSelected?(
                                      <span className="prd-size me-3 f-15 text-center capitalize selected" key={`size_${index}`}
                                      onClick = {()=>this.sizeChanged(size)}>{size}</span>
                                  ):(
                                      <span className="prd-size me-3 f-15 text-center capitalize" key={`size_${index}`}
                                       onClick = {()=>this.sizeChanged(size)}>{size}</span>
                                  )
                              ))
                          }
                      
                      </div>
                  </div>
            
              </>
          )
      }else{
          <></>
      }
     
    }

    render() {
        return(
            <>
         <div className="row mt-5 mb-2">
            <div className="col-md-6 col-sm-12 col-xm-12">
                <div className="justify-content-center d-flex bg-color-f6f6f4 relative">
                  <FashionItemZoom proplibraryImages= {this.state.firstProductImages} />
                </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xm-12">
                <div className="page-pduct d-flex flex-column">
                    <div className="specific-product">
                        <h1> <span className="p-title">{this.props.product.prd_name}</span> </h1>                       
                        <div className="mt-3">
                            <span className="p-price">${ Number(this.state.prd_price).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                            <span className="prd-regular-price ms-2">${Number(this.state.prd_regular_price).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                        {
                           this.state.isShow &&  this.props.specificImgsColor.length ?
                           (<div>
                            <ShowSpecificImgColor isClass={true} sameImages={this.props.specificImgsColor}
                            getProductImgIndex ={this.productImageIndex}
                           />
                          </div>):(<></>)
                        }
                        
                        <div className="row my-3">
                           {this.firstZise(this.state.indx)}
                           <div className="col">
                            <div className="f-15">Sex:</div>
                            <div className="d-flex flex-row  fit-box mt-3 pb-3">
                                {
                                    this.props.product.prd_sex==='M'?
                                    (<span className="prd-sex me-3 f-15 text-center selected">M</span>):
                                    (<span className="prd-sex me-3 f-15 text-center selected">F</span>)
                                }
                                
                            </div>
                        </div>
                        </div>
                        <div className="f-15 my-3">Add a quanlity:</div>

                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(FashionCompZoom);




