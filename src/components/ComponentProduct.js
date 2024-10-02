import React, {useRef, useState, useEffect, useCallback} from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import PductAttributes from "./attribute/PductAttributes";
import ModalImageLibrary from "./modals/ModalImageLibrary";

import {getOptionTypes, new_product, update_product} from '../api/productService'

import $  from "jquery";
let nextId = 0;
const ComponentProduct=({id, data, attDefault, pageTitle})=>{
    const [p_Option, setP_Option] = useState({
        p_type:'',
        p_size_inch:'',
        p_cpu: '',
        p_cpu_generation:'',
        p_series: '',
        p_capacity: '',
        p_hard_disk: ''   
    })

    const [prdTypes, setPrdTypes] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [cpus, setCPU] = useState([]);
    const [cpu_generates, setCPUGenerates] = useState([]);
    const [series, setSeries] = useState([]);
    const [rams, setRams] = useState([]);
    const [harddisks, setHarddisks] = useState([]);
  
    const [keyValue, setKeyValue] = useState({});

    
   //create dynamic comp
    const [attributeNumber, setAttributteNumber] = useState([])
    const [text, setText] = useState("");


    const [folder, setFolder] = useState("");

    const imageLabraryRef = useRef(null)

    //const attRef = useRef(null);   

    useEffect(() => {
        document.body.className = '#e9ecef';
        //fist load
        getOptionTypes().then(rsl=>{ 
            setPrdTypes(rsl.product_types)
            setSizes(rsl.sizes)
            setCPU(rsl.cpus)
            setCPUGenerates(rsl.cpu_generates)
            setSeries(rsl.series)
            setRams(rsl.rams)
            setHarddisks(rsl.harddisk)
       })
    }, [data])

    useEffect(() => {
        //set default value and change value when click
        setP_Option({
            p_type: data?.p_type ?? '',
            p_size_inch: data?.p_size_inch  ?? '',
            p_cpu: data?.p_cpu  ?? '',
            p_cpu_generation:data?.p_cpu_generation ?? '',
            p_series:data?.p_series ?? '',
            p_capacity:data?.p_capacity ?? '',
            p_hard_disk:data?.p_hard_disk ?? '',
        })
    },[data])

    useEffect(() => {
        if(attDefault.length > 0){
            attDefault.map(attribute =>  setAttributteNumber(prevInputValues => [...prevInputValues, {text, id: nextId++,attribute:attribute}]))
        
        }
    },[attDefault])


    /////////////
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setKeyValue((prevInputValues)  => ({
            ...prevInputValues,
           [name]:value
          }))

          setP_Option({...p_Option, [e.target.name]: e.target.value});

          if(name==='p_type'){
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

    /////Create new product
    const handleSubmit =async (e)=>{
        e.preventDefault();
        // submit to server 
       let p_image_present =''       
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
                p_image_present = $(that).find('.for-one').attr('title') 
                more_images = (more_images==='')? p_image_present :p_image_present+','+more_images
                
            }
          //  $(this).find('.for-one')
            attrs.push({
                p_sku: $(that).find('.p_sku').val(),
                p_attr_color: $(that).find('.p_color').val(),
                p_attr_amount: $(that).find('.p_quantity').val(),               
                p_attr_price: $(that).find('.p_price').val(),
                p_attrr_egular_price: $(that).find('.p_regular').val(),
                p_attr_image: $(that).find('.for-one').attr('title'),
                p_attr_more_images: more_images
            })
        }
       })
       
       var data = {}
       for(let key in keyValue){
        if( keyValue[key] != null ){  
            data[key] =   keyValue[key]              
            }        
        } 
      
       if(p_image_present !=='') {
        keyValue.p_image_present =  p_image_present
       
       }     

     let attributes =[]
      if(attrs.length > 0) {
        attributes =  attrs
      }

      let paras = {
        dataProduct: keyValue,
          attributes: attributes         
      }

      if(id !==undefined && id !==null && id !==''){
        keyValue.p_id = id
        await update_product(paras) 
       }else{
        await new_product(paras)   
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
                    <Form.Select name="p_type" value={p_Option.p_type ?? ''}  onChange={(e)=>handleInputChange(e)}>
                       <option></option>
                       {prdTypes.map((item) =>(
                        <option value={item.prd_type_name} key={`prd_type_${item.prd_type_id}`} folder={item.prd_type_group}
                       >{item.prd_type_name}</option>
                       ))}
                       
                    </Form.Select>
                </div>
                <div className="col col-md-6">
                    <Form.Label>Order Code(import)</Form.Label>
                    <Form.Control type="text" name="order_code"  defaultValue={data.order_code} onChange={(e)=>handleInputChange(e)} />
                </div>
            </div>
            <div className="row mt-3">
               <div className="col col-md-6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="p_name"  defaultValue={data.p_name} onChange={(e)=>handleInputChange(e)} />
                </div>                              
            </div>
            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label> Description</Form.Label>
                    <Form.Control as="textarea" rows={10} name="p_disctiption" defaultValue={data.p_disctiption} onChange={(e)=>handleInputChange(e)} />
                </div>
                <div className="col col-md-6">
                    <Form.Label>Special points</Form.Label>
                    <Form.Control as="textarea" rows={10} name="p_special_point" defaultValue={data.p_special_point} onChange={(e)=>handleInputChange(e)} />                    
            
                </div>
            </div>
            <div className="row mt-3">
               <div className="col col-md-6">
                    <Form.Label>CPU</Form.Label>
                    <Form.Select name ="p_cpu" value={p_Option?.p_cpu  ?? ""} onChange={(e)=>handleInputChange(e)}>
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
                    <Form.Select name="p_cpu_generation" value={p_Option?.p_cpu_generation  ?? ""} onChange={(e)=>handleInputChange(e)}>
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
                    <Form.Select name="p_series" value={p_Option?.p_series ?? ""} onChange={(e)=>handleInputChange(e)}>
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
                    <Form.Select name ="p_size_inch" onChange={(e)=>handleInputChange(e)} value={p_Option?.p_size_inch  ?? ""}>
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
                <Form.Label>RAM</Form.Label>
                <Form.Select  name="p_capacity"  value={p_Option?.p_capacity  ?? ""} onChange={(e)=>handleInputChange(e)} >
                    <option></option>
                    {
                        rams.map(ram=> (
                            <option defaultValue={ram.ram_name} key={`ram_${ram.ram_id}`}
                            >{ram.ram_name}</option>
                            ))
                    }
                </Form.Select>
            </div>
            <div className="col col-md-6">
                <Form.Label>Hard disk</Form.Label>
                <Form.Select  name="p_hard_disk"  value={p_Option?.p_hard_disk  ?? ""} onChange={(e)=>handleInputChange(e)} >
                    <option></option>
                    {
                        harddisks.map(harddisk=> (
                            <option defaultValue={harddisk.harddisk_capacity} key={`harddisk_${harddisk.harddisk_id}`}
                            >{harddisk.harddisk_capacity}</option>
                            ))
                    }
                </Form.Select>
            </div>
            </div>

            {/**ATTRIBUTE */}
            <div className="row mt-3" >
                <div className="col" > 
                   <fieldset id="laptop-attribute">  
                    <legend className="w-auto">Product Attributes</legend> 
                    
                    {
                    attributeNumber.length >0?
                        attributeNumber.map((item, index)=>(      
                            <PductAttributes key={`comp_${index}`}
                            deFaultAttrs ={item.attribute} delAttribute = {delAttribute}
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

export default ComponentProduct;