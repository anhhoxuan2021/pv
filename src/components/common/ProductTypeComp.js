import React, {useState, memo, useEffect} from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

import {getBrands, new_ProductType} from '../../api/productService'

const ProductTypeComp = ({pageTitle, brandValue}) => {
    const [brands, setBrands] = useState([])
    const [brandDefault, setBrandDefault] = useState(brandValue)
    const [values, setKeyValues] = useState({})

    useEffect(()=>{
        document.body.className = '#e9ecef';

        getBrands().then(data =>{
            setBrands(data)
        })
    },[])

        /////////////
        const handleInputChange = (e) => {
            let name = e.target.name
            let value = e.target.value

            setBrandDefault(value)
    
            setKeyValues((prevInputValues)  => ({
                ...prevInputValues,
               [name]:value
              }))              
        }

        const handleSubmit =async (e)=>{
            e.preventDefault();
            if(values?.prd_type_brand !=='' && values?.prd_type_group !=='' && values?.prd_type_name !==''){
                let paras = {
                    dataPType: values     
                }

                new_ProductType(paras)
            }
        
        }

    return (
        <div className="container bg-white px-0">
            <Card className="bg-secondary rounded-0 mt-4">
                <Card.Body>
                    <Card.Title className="fs-weight text-white text-center">{pageTitle} </Card.Title>
                </Card.Body>
            </Card>

            <Form className="px-4 pb-4">
                <div className="row mt-3">
                    <div className="col col-md-6">
                        <Form.Label>Brands</Form.Label>
                        <Form.Select name="prd_type_brand" value={brandDefault ?? ''}  onChange={(e)=>handleInputChange(e)}>
                       <option></option>
                       {
                       brands.length >0 ?
                        brands.map((item) =>(
                           <option value={item.brand_id} key={`brand_${item.brand_id}`} >{item.brand_name}</option>
                       )) :""}
                       
                    </Form.Select>
                       
                    </div>     
                </div>
                <div className="row mt-3">
                    
                    <div className="col col-md-6">
                        <Form.Label>Product Type Name</Form.Label>
                        <Form.Control type="text" name="prd_type_name"  onChange={(e)=>handleInputChange(e)} />
                    </div> 
                    <div className="col col-md-6">
                        <Form.Label>Product Type Group</Form.Label>
                        <Form.Control type="text" name="prd_type_group"  onChange={(e)=>handleInputChange(e)} />
                    </div>   
                </div>
            </Form>
            <div className="row mt-3">
                    <div className="col text-right md-2">
                        <button type="button" className="btn btn-outline-secondary me-4 mb-4" style={{width:"100px"}} onClick={(e)=>handleSubmit(e)}>Save</button>
                    </div>
                    
                </div>
        </div>
    )
}

export default memo(ProductTypeComp)