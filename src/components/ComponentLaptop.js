import React, {useRef, useState, useEffect, useCallback} from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import LaptopAttributes from "./attribute/LaptopAttributes";
import ModalImageLibrary from "./modals/ModalImageLibrary";

import {getOptionTypes, new_Laptop, update_Laptop} from '../api/productService'

import $  from "jquery";
let nextId = 0;
const ComponentLaptop=({latop_id, laptop, laptopAttDefault, pageTitle})=>{
    const [laptopOption, setLaptopOption] = useState({latop_type:'',
        laptop_size_inch:'',
        latop_cpu: '',
        latop_cpu_generation:'',
        latop_laptop_demand: '',
        latop_serieslaptop: ''
    })

    const [prdTypes, setPrdTypes] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [cpus, setCPU] = useState([]);
    const [cpu_generates, setCPUGenerates] = useState([]);
    const [laptop_demands, setLaptopDemands] = useState([]);
    const [series, setSeries] = useState([]);

  
    const [keyValue, setKeyValue] = useState({});

    
   //create dynamic comp
    const [attributeNumber, setAttributteNumber] = useState([])
    const [text, setText] = useState("");


    const [folder, setFolder] = useState("");

    const imageLabraryRef = useRef(null)

    //const attRef = useRef(null);   

    useEffect(() => {
        document.body.className = '#e9ecef';
        getOptionTypes().then(data=>{ 
            setPrdTypes(data.product_types)
            setSizes(data.sizes)
            setCPU(data.cpus)
            setCPUGenerates(data.cpu_generates)
            setLaptopDemands(data.laptops)
            setSeries(data.series)
       })
    }, [laptop])

    useEffect(() => {
        setLaptopOption({
            latop_type: laptop?.latop_type ?? '',
            laptop_size_inch: laptop?.laptop_size_inch  ?? '',
            latop_cpu: laptop?.latop_cpu  ?? '',
            latop_cpu_generation:laptop?.latop_cpu_generation ?? '',
            latop_serieslaptop:laptop?.latop_serieslaptop ?? '',
            latop_laptop_demand:laptop?.latop_laptop_demand ?? ''})
    },[laptop])

    useEffect(() => {
        if(laptopAttDefault.length > 0){
          laptopAttDefault.map(attribute =>  setAttributteNumber(prevInputValues => [...prevInputValues, {text, id: nextId++,attribute:attribute}]))
        
        }
    },[laptopAttDefault])


    /////////////
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setKeyValue((prevInputValues)  => ({
            ...prevInputValues,
           [name]:value
          }))

          setLaptopOption({...laptopOption, [e.target.name]: e.target.value});

          if(name==='latop_type'){
            let folder = e.target[e.target.selectedIndex].getAttribute('folder')
            setFolder(folder)  //folder
          }
          
    }

    ///////////Add attribute component
   const addAttribute = useCallback(() =>{
       setAttributteNumber(prevInputValues => [...prevInputValues, {text, id: nextId++, attribute:{}}]);    
       setText("");
    }, [text])

    const delAttribute = useCallback(id => {
        setAttributteNumber(prv => prv.filter(prv => prv.id !== id));
    }, []);

    /////show modal component
    function addImg(e){
        e.preventDefault(); 
        imageLabraryRef.current.imageLibrayShow(e)
        }

    /////Create new laptop
    const handleSubmit =async (e)=>{
        e.preventDefault();
        // submit to server 
       let latop_image_present =''       
       let attrs = []
       $('#laptop-attribute .attr-row').each(function(){
        if($(this).find('.laptop_ram').val() !==''){
            let that  = $(this)
            let more_images = ''
            that.find('.for-many').each(function(){
                more_images = (more_images==='')? $(this).attr('title'):more_images+','+$(this).attr('title')
            })

            //console.log(more_images)

            if($(that).find('.for-one').attr('title') !=''){
                more_images =   $(that).find('.for-one').attr('title') +','+more_images
                latop_image_present = $(that).find('.for-one').attr('title') 
            }
          //  $(this).find('.for-one')
            attrs.push({
                capacity: $(that).find('.laptop_ram').val(),
                amount: $(that).find('.laptop_quantity').val(),
                color: $(that).find('.latop_color').val(),
                price: $(that).find('.laptop_price').val(),
                regular_price: $(that).find('.laptop_regular').val(),
                image: $(that).find('.for-one').attr('title'),
                more_images: more_images
            })
        }
       })
       
       var data = {}
       for(let key in keyValue){
        if( keyValue[key] != null ){  
            data[key] =   keyValue[key]              
            }        
        } 
      
       if(latop_image_present !=='') {
        keyValue.latop_image_present =  latop_image_present
       
       }     

     let attributes =[]
      if(attrs.length > 0) {
        attributes =  attrs
      }

      let paras = {
          dataLaptop: keyValue,
          attributes: attributes         
      }

      if(latop_id !==undefined && latop_id !==null && latop_id !==''){
        keyValue.latop_id = latop_id
        await update_Laptop(paras) 
       }else{
        await new_Laptop(paras)   
       }
      
    }

        return(
            <div className="container bg-white px-0">
            <Card className="bg-secondary rounded-0 mt-4">
                <Card.Body>
                    <Card.Title className="fs-weight text-white text-center">{pageTitle} </Card.Title>
                </Card.Body>
            </Card>

            <ModalImageLibrary ref ={imageLabraryRef} folder={folder}/>
           
            <Form className="px-4">
            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Select name="latop_type" value={laptopOption.latop_type ?? ''}  onChange={(e)=>handleInputChange(e)}>
                       <option></option>
                       {prdTypes.map((item) =>(
                        <option value={item.prd_type_name} key={`prd_type_${item.prd_type_id}`} folder={item.prd_type_group}
                       >{item.prd_type_name}</option>
                       ))}
                       
                    </Form.Select>
                </div>
                <div className="col col-md-6">
                    <Form.Label>Order Code(import)</Form.Label>
                    <Form.Control type="text" name="order_code"  defaultValue={laptop.order_code} onChange={(e)=>handleInputChange(e)} />
                </div>
            </div>
            <div className="row mt-3">
               <div className="col col-md-6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="latop_name"  defaultValue={laptop.latop_name} onChange={(e)=>handleInputChange(e)} />
                </div>  
                <div className="col col-md-6">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control type="text" name="latop_sku"  defaultValue={laptop.latop_sku} onChange={(e)=>handleInputChange(e)} />
                </div>                             
            </div>
            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label> Description</Form.Label>
                    <Form.Control as="textarea" rows={10} name="latop_disctiption" defaultValue={laptop.latop_disctiption} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="col col-md-6">
                    <Form.Label>Special points</Form.Label>
                    <Form.Control as="textarea" rows={10} name="laptop_special_point" defaultValue={laptop.laptop_special_point} onChange={(e)=>handleInputChange(e)} />                    
            
                </div>
            </div>
            <div className="row mt-3">
               <div className="col col-md-6">
                    <Form.Label>CPU</Form.Label>
                    <Form.Select name ="latop_cpu" value={laptopOption?.latop_cpu  ?? ""} onChange={(e)=>handleInputChange(e)}>
                        <option></option>
                        {
                            cpus.map((cpu) => (
                                <option defaultValue={cpu.cpu_name} key={`cpu_${cpu.cpu_id}`}
                                 >{cpu.cpu_name}</option>
                                ))
                        }
                    </Form.Select>
                </div>
                <div className="col col-md-6">
                    <Form.Label>CPU Generation</Form.Label>
                    <Form.Select name="latop_cpu_generation" value={laptopOption?.latop_cpu_generation  ?? ""} onChange={(e)=>handleInputChange(e)}>
                        <option></option>
                        {
                            cpu_generates.map(cpu_generation => (
                                <option defaultValue={cpu_generation.cpu_generation_name} key={`cpu_generation_${cpu_generation.cpu_generation_id}`}
                                >{cpu_generation.cpu_generation_name}</option>
                                ))
                        }
                    </Form.Select>
                </div>
            </div> 
            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label>Series</Form.Label>
                    <Form.Select name="latop_serieslaptop" value={laptopOption?.latop_serieslaptop ?? ""} onChange={(e)=>handleInputChange(e)}>
                        <option></option>
                        {
                            series.map(item => (
                                <option defaultValue={item.series_name} key={`series_${item.series_id}`}
                              >{item.series_name}</option>
                                ))
                        }
                    </Form.Select>
                </div>
                <div className="col col-md-6">
                    <Form.Label>Size</Form.Label>
                    <Form.Select name ="laptop_size_inch" onChange={(e)=>handleInputChange(e)} value={laptopOption?.laptop_size_inch  ?? ""}>
                        <option></option>
                        {sizes.map((item) => (
                                <option defaultValue={item.size_name} key={`size_${item.size_id}`}
                                 >{item.size_name}</option>
                                ))}
                    </Form.Select>
                </div>                
            </div>

            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label>Demand</Form.Label>
                    <Form.Select name="latop_laptop_demand" value={laptopOption?.latop_laptop_demand  ?? ""} onChange={(e)=>handleInputChange(e)}>
                        <option></option>
                        {
                            laptop_demands.map(item => (
                                <option defaultValue={item.latop_deman_name} key={`laptop_${item.latop_deman_id}`}
                                >{item.latop_deman_name}</option> 
                            ))
                        }
                    </Form.Select>
                </div>
            </div>

            <div className="row mt-3" >
                <div className="col" > 
                   <fieldset id="laptop-attribute">  
                    <legend className="w-auto">Product Attributes</legend> 
                    
                    {
                    attributeNumber.length >0?
                        attributeNumber.map((item, index)=>(      
                            <LaptopAttributes key={`comp_${index}`}
                            laptopAttrs ={item.attribute} delAttribute = {delAttribute}
                            addImg = {addImg} numeric = {index+1}  item ={item}
                             />
                        )) : ''

                    }

                    <div className="row">
                        <div className="col">
                        <label className="fw-bold my-1 text-danger" style={{cursor:"pointer"}} onClick={()=>addAttribute()}>Add Attribute +</label>                                  
                        </div>                    
                    </div>
                   
                   </fieldset>
                   
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

export default ComponentLaptop;