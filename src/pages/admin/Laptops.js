import React, {useEffect,useState} from "react";
import { Link, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLaptops } from '../../features/laptop/laptopSlice';
import parse from 'html-react-parser';
import {path_img1} from '../../const'

import Pagination from '../../components/pagination'

const limit =10
const Laptops =() =>{
    const dispatch  = useDispatch();
    const {laptops,loading, totalItems, totalPages} = useSelector((state)=>state.laptop)

   const [currentPage, SetcurrentPage] = useState(1)
   useEffect(() => {
    document.body.className = 'bg-white';       
   },[])

   let fetchMount = true;
   let pageNum =1;
   useEffect(()=>{
     if(fetchMount)  dispatch(fetchLaptops({pageNum, limit}))
     //unmount
     return ()=>fetchMount = false;
   },[])
 

   if(loading) return <div>Loading...!</div>

   const onPageChange =(pageNumber) => {
        pageNum = pageNumber 
        SetcurrentPage(pageNumber);  
        dispatch(fetchLaptops({pageNum, limit}))     
   }

  return(
    <>
    <Table hover striped bordered  className=" header-h-25 not-pt">
        <thead>
            <tr className="text-center">
                <th rowSpan="2" style={{width:"35px", verticalAlign:"middle"}}>#</th>
                <th rowSpan="2" style ={{width:"350px", verticalAlign:"middle"}}>Name</th>
                <th rowSpan="2" style={{width:"150px", verticalAlign:"middle"}}>Sku</th>
                <th rowSpan="2"style={{width:"100px", verticalAlign:"middle"}}>CPU</th>
                <th>Attributes</th>
            </tr>
            <tr>
                
                <td >
                    <div className="row text-center" >
                        <div className="col col-md-2 border-end middle">Image</div>
                        <div className="col col-md-2 border-end middle">Capacity</div>
                        <div className="col col-md-2 border-end middle">Color</div>
                        <div className="col col-md-2 border-end middle">Amount</div>
                        <div className="col col-md-2 border-end middle">Price</div>
                        <div className="col col-md-2 middle">Regular Price</div>
                    </div>
                </td>
            </tr>
        </thead>
        <tbody>
            {
                laptops.length >0? laptops.map((laptop,index)=>(
           
            <tr key={laptop.latop_id} >
                <td className="align-middle">{index}</td>
                <td className="align-middle" style={{cursor:"pointer"}}>
                    <Link to={`/admin/laptop/${laptop.latop_id}`}> {laptop.latop_name}</Link>
                    </td>
                <td className="text-center alig align-middle">{laptop.latop_sku}</td>
                <td className="text-center align-middle">{laptop.latop_cpu}</td>
           
                <td> 
                    {
                        laptop.attributes.length >0?
                        laptop.attributes.map((att,ind)=>(
                            <div className="row text-center" key={`attribute-$${att.attr_id}`}>
                                <div className="col col-md-2 border-end middle mx-0">
                                   <img src={`${path_img1+att.image}`} style={{width: "80px"}} alt="anhho" />
                                </div>
                                <div className="col col-md-2 border-end middle">{att.capacity}</div>
                                <div className="col col-md-2 border-end middle">{att.color}</div>
                                <div className="col col-md-2 border-end middle">{att.amount}</div>
                                <div className="col col-md-2 border-end middle">{ Number(att.price).toLocaleString(undefined, {minimumFractionDigits: 0}) } </div>
                                <div className="col col-md-2 middle">{Number(att.regular_price).toLocaleString(undefined, {minimumFractionDigits: 0})}</div>
                            </div>
                        )) 
                       :(<></>)
                    }
                </td>
            </tr>
           
                )):
                (<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
                )
            }
            
        </tbody>
    </Table>
    <div className="row my-4">
                <div className="col">                    
                    <Pagination
                        totalPg= {totalPages}
                        currentPg={currentPage}
                        maxVisibleButtons ="3"
                        pagechanged ={onPageChange}
                        />
                </div>
            </div>
    </>
  )
}

export default Laptops