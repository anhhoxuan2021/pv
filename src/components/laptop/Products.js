import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchProducts } from '../../features/product/productSlice';
import parse from 'html-react-parser';

const Products=(props)=> {
  //const {productId} = useParams();
  const dispatch  = useDispatch();
  const {products,loading} = useSelector((state)=>state.product)
  let fetchMount = true;
  const path_img1 = 'http://localhost:8001/images/'
  useEffect(()=>{
    if(fetchMount)  dispatch(fetchProducts())
    //unmount
    return ()=>fetchMount = false;
  },[])

  if(loading) return <div>Loading...!</div>

  const reRenderAttributes =(attributes)=>{
        let prd_img = 'unknow.png'
        attributes = JSON.parse(attributes)
        var itemAttr = {
                            amount: '',
                            prd_img : 'unknow.png',
                            prd_price :  0,
                            prd_regular_price :  0,
                        }

        attributes.forEach((item)=>{            
            if(item.prd_img !='' && item.prd_img !=null && item.prd_img !=undefined ){
                prd_img = item.prd_img               
            }            
            
            if(!isNaN(parseFloat(item.prd_size_s)) && 
                    !isNaN(parseFloat(item.prd_s_regular_price)) &&
                    !isNaN(parseFloat(item.prd_s_price)) ){
                        return itemAttr = {
                            amount: item.prd_size_s,
                            prd_img : prd_img,
                            prd_price :  item.prd_s_price,
                            prd_regular_price :  item.prd_s_regular_price,
                        }
                }    
                
        })

        itemAttr.prd_img = prd_img
        
        let attr = []
        attr.push(itemAttr) 
        //console.log(attr)
        return attr
    }

  return (
    <div className="row">               
        <div>
            <div className="row row-cols-xs-1 row-cols-sm-1 row-cols-md-4 mt-2" >
                {   
                   products.length >0?           
                    products.map((item,index)=>{
                        return(
                            <div className='col prd-item flex-column' key={item.prd_id}>  
                            {
                                item.prod_attr !=null && item.prod_attr !='' && reRenderAttributes(item.prod_attr).map((el,index1)=>{
                                    //console.log(el)
                                    return(
                                     
                                        <div className="prd-item-info bg-white" key={index1}>                                            
                                            <Link to={`/laptop/${item.prd_id}`} className="prd-item-photo" >
                                                <span className="prd-image-container align-items-center d-flex">
                                                <img
                                                    className="prd-image-photo"
                                                    src={`${path_img1+el.prd_img}`}
                                                    alt="anh ho"
                                                    /> 
                                                </span> 
                                            </Link>
                                            <div className="prd-item-details flex-column">
                                                <strong className="prd-item-name"> 
                                                    <Link to= {`laptop/${item.prd_id}`}  className="prd-item-link" title={item.prd_name} >
                                                        <div className="special-product-label mid-mid text-only ">
                                                        <div className="text-center f-10 c-ff0000">
                                                            <span>MỚI</span>
                                                        </div>
                                                    </div>
                                                    {item.prd_name}
                                                    </Link>                                            
                                                </strong>
                                                <div className="f-14 mt-2 min-h-220">{parse(item.prod_special_point+'')} </div>
                                                <div className="d-inline fit-box">
                                                <span className="prd-price">${ Number(el.prd_price).toLocaleString(undefined, {minimumFractionDigits: 2}) }</span>
                                                <span className="prd-regular-price ms-2">${ Number(el.prd_regular_price).toLocaleString(undefined, {minimumFractionDigits: 2}) }</span>
                                            </div>
                                            </div>
                                        </div>
                                        
                                    )
                                })

                            }
                           
                        </div>
                        )
                    })
                    :
                    ''
                }
            </div>
        </div>            
    </div>
  )
}

export default Products;