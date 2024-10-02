import React, {useRef, useState, useEffect} from "react";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import {getProductTypes, uploadFiles} from '../../api/productService'

import EditIcon from "../../images/edit_icon.svg"
import NoneImg from '../../images/qcode.png'
import $  from "jquery";

const MaxCount = 4
const AddLaptop=()=>{
    const [laptopProperties, setLaptopProperties] =useState({
        prd_name: '',
        prd_sku: '',
        prd_quantity: '',
        prd_disctiption: '',
        prd_price:'',
        prd_regular:'',
        prd_short_disctiption:'',
        prd_type:'',
        prd_price_shock:'',
        prod_attr:'',
        prod_special_point:'',
        prd_brand_id:'',
        prd_tag:'',
        prd_batch_code:'',
        prod_size_inch:'',
        // image_present:'',
        // more_image:'',
        prd_suggest:'',
        prd_color:'',
        prd_cpu:'',
        prd_cpu_generation:'',
        prd_laptop_demand:'',
        prd_ram:'',
        prd_serieslaptop:''
    })

    const [pageTitle, setPageTitle] = useState('Add Laptop')
    const [showImage, setShowImage] = useState(NoneImg);
    const [imageFile, setImageFile] = useState('')
    const [imageFlag, setImageFlag] = useState(false);
    const [moreImageFiles, setMoreImageFiles] = useState([]) 
    const [filesFlag, setFilesFlag] = useState(false);
    //const [types, setTypes] = useState({});
    const [prdTypes, setPrdTypes] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [cpus, setCPU] = useState([]);
    const [cpu_generates, setCPUGenerates] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [rams, setRams] = useState([]);
    const [series, setSeries] = useState([]);

    const [profileImage, setProfileImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);  

    const imageRef = useRef('');
    const moreImagesRef = useRef('');

    useEffect(() => {
        document.body.className = '#e9ecef';
        getProductTypes().then(data=>{ 
            setPrdTypes(data.product_types)
            setColors(data.colors)
            setSizes(data.sizes)
            setCPU(data.cpus)
            setCPUGenerates(data.cpu_generates)
            setLaptops(data.laptops)
            setRams(data.rams)
            setSeries(data.series)
       })
    }, [])
 

    ////////////
    const  updateLaptopProperties =(e) => {
        setLaptopProperties({...laptopProperties, [e.target.name]: e.target.value});
    }
     ////////////
     const handleImageUpload = (event) => {
        event.preventDefault();
        imageRef.current.click();
      }

     ////////////
     const loadImage = (event) => {
       /// setProfileImage(event.target.files[0]);

        var reader = new FileReader();
        reader.onload = () =>{
        //var output = document.getElementById('output');
        // output.src = reader.result;
        setShowImage(reader.result);
        };
            reader.readAsDataURL(event.target.files[0]);
            setImageFile(event.target.files[0])
            setImageFlag(true)
            
    };

    ////////////
    const loadMoreImages =(e)=>{
        e.preventDefault(); 
      //  setGalleryImages(e.target.files);
        const checkFile = [...moreImageFiles]   
        let moreImageFilesLength = moreImageFiles.length
        const files = e.currentTarget.files;
        Object.keys(files).forEach(i => {
        const file = files[i];   
      
        if((checkFile.findIndex((f)=>f.fileName===file.name) === -1) && moreImageFilesLength < MaxCount && i < MaxCount){
            moreImageFilesLength ++
          const reader = new FileReader();             
          reader.onload = (e) => {   
            let fileName = file.name     
            let img = reader.result    
             checkFile.push({fileName:fileName,img:img,files:file})          
             setMoreImageFiles(checkFile);       
           // img.src = reader.result // e.target.result;  //by using 'reader.result' or 'file'
          }
         
          reader.readAsDataURL(file);          
          setFilesFlag(true) 
          }
        })
     }
     /////
    const handleDelete =(e)=>{
        e.preventDefault(); 
        let newState = moreImageFiles.filter(item => item.fileName !== e.target.getAttribute('index'))
       
        if(newState.length <1)  setFilesFlag(false) 
        setMoreImageFiles(newState)
    }

    /////
    const handleSubmit =async (e)=>{
        e.preventDefault();
        if(imageFlag){
            laptopProperties.represent_img = imageFile
        }

        if(filesFlag){
            let filesupload =[]   //files
            moreImageFiles.map(item => (
                filesupload.push(item.files)
            ))

            laptopProperties.more_imgs = filesupload
        }
      //  laptopProperties.profileImage = profileImage
      //  laptopProperties.galleryImages = galleryImages

       await uploadFiles(laptopProperties)
    }

        return(
            <div className="container bg-white px-0">
            <Card className="bg-secondary rounded-0 mt-4">
                <Card.Body>
                    <Card.Title className="fs-weight text-white text-center">{pageTitle} </Card.Title>
                </Card.Body>
            </Card>
           
            <Form className="px-4">
            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Select onChange={(e)=>setLaptopProperties({prd_type:e.target.value})}>
                       <option></option>
                       {prdTypes.map((item) =>(
                        <option value={item.prd_type_id} key={`prd_type_${item.prd_type_id}`}>{item.prd_type_name}</option>
                       ))}
                       
                    </Form.Select>
                </div>
                <div className="col col-md-6">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="prd_name"  value={laptopProperties.prd_name} onChange={(e)=>updateLaptopProperties(e)} />
                </div>
            </div>
            <div className="row mt-3">
            <div className="col col-md-6">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control type="text" name="prd_sku"  value={laptopProperties.prd_sku} onChange={(e)=>updateLaptopProperties(e)} />
                </div>
                <div className="col col-md-6">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" name="prd_quantity" value={laptopProperties.prd_quantity} onChange={(e)=>updateLaptopProperties(e)} />
                </div>                
            </div>
            <div className="row mt-3">
                <div className="col col-md-6">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="prd_price" value={laptopProperties.prd_price} onChange={(e)=>updateLaptopProperties(e)} />
                </div>
                <div className="col col-md-6">
                    <Form.Label>Regular Price</Form.Label>
                    <Form.Control type="number" name="prd_regular" value={laptopProperties.prd_regular} onChange={(e)=>updateLaptopProperties(e)} />
                </div>
            </div> 
            <div className="row mt-3">
                <div className="col">
                   <fieldset >  
                     <legend className="w-auto">Product Attributes</legend> 
                     <div className="row">
                        <div className="col col-md-6">
                            <Form.Label>Size</Form.Label>
                            <Form.Select name ="prod_size_inch" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {sizes.map((item) => (
                                     <option value={item.size_id} key={`size_${item.size_id}`}>{item.size_name}</option>
                                     ))}
                            </Form.Select>
                        </div>
                        <div className="col col-md-6">
                            <Form.Label>Color</Form.Label>
                            <Form.Select name="prd_color" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {
                                     colors.map((item) =>(
                                        <option value={item.color_id} key={`color_${item.color_id}`}>{item.color_name}</option>
                                     ))
                                     
                                }
                            </Form.Select>
                        </div>
                     </div>
                     <div className="row mt-3">
                        <div className="col col-md-6">
                            <Form.Label>CPU</Form.Label>
                            <Form.Select name ="prd_cpu" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {
                                    cpus.map((cpu) => (
                                        <option value={cpu.cpu_id} key={`cpu_${cpu.cpu_id}`}>{cpu.cpu_name}</option>
                                     ))
                                }
                            </Form.Select>
                        </div>
                        <div className="col col-md-6">
                            <Form.Label>CPU Generation</Form.Label>
                            <Form.Select name="prd_cpu_generation" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {
                                    cpu_generates.map(cpu_generation => (
                                        <option value={cpu_generation.cpu_generation_id} key={`cpu_generation_${cpu_generation.cpu_generation_id}`}>{cpu_generation.cpu_generation_name}</option>
                                     ))
                                }
                            </Form.Select>
                        </div>
                     </div>
                     <div className="row mt-3">
                        <div className="col col-md-6">
                            <Form.Label>Series</Form.Label>
                            <Form.Select name="prd_serieslaptop" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {
                                    series.map(item => (
                                        <option value={item.series_laptop_id} key={`series_${item.series_id}`}>{item.series_name}</option>
                                     ))
                                }
                            </Form.Select>
                        </div>
                        <div className="col col-md-6">
                            <Form.Label>RAM</Form.Label>
                            <Form.Select name="prd_ram" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {
                                    rams.map(ram=> (
                                        <option value={ram.ram_id} key={`ram_${ram.ram_id}`}>{ram.ram_name}</option>
                                     ))
                                }
                            </Form.Select>
                        </div>
                     </div>
                     <div className="row mt-3">
                        <div className="col col-md-6">
                            <Form.Label>Demand</Form.Label>
                            <Form.Select name="prd_laptop_demand" onChange={(e)=>updateLaptopProperties(e)}>
                                <option></option>
                                {
                                    laptops.map(item => (
                                        <option value={item.latop_deman_id} key={`laptop_${item.latop_deman_id}`}>{item.latop_deman_name}</option> 
                                    ))
                                }
                            </Form.Select>
                        </div>
                     </div>
                   </fieldset>
                   <div className="row mt-3">
                     <div className="col col-md-6">
                         <Form.Label> Description</Form.Label>
                         <Form.Control as="textarea" rows={10} name="prd_disctiption" value={laptopProperties.prd_disctiption} onChange={(e)=>updateLaptopProperties(e)} />
                     </div>
                     <div className="col col-md-6">
                         <Form.Label>Short Description</Form.Label>
                         <Form.Control as="textarea" rows={3} name="prd_short_disctiption" value={laptopProperties.prd_short_disctiption} onChange={(e)=>updateLaptopProperties(e)} />                     
                         
                         <div className="row mt-3">
                            <div className="col">
                                  <Form.Label className="mt-3">Laptop image:</Form.Label>
                                  <div className='col-md-6 relative'>
                                    <div className='div-parent-200 relative'>
                                    <img src={showImage}  alt="Anh Ho" />
                                    <img className='h-35 z-index-20 absolute' src={EditIcon}  alt="Edit" onClick={(e)=>handleImageUpload(e)} />
                                    </div> 
                                    <input 
                                        type="file"
                                        id="file" accept="image/*"
                                        ref={imageRef}
                                        onChange ={(event)=>loadImage(event)}
                                        hidden />
                                    </div>
                            </div>
                         </div>
                         <div className="row mt-3">
                         <div className="col">
                                <label className="form-label">More images:</label>
                                <input  className="form-control" type="file" multiple="multiple" name="files[]" id="more_files" 
                                accept="image/*" ref ={moreImagesRef}
                                onChange={(e)=>loadMoreImages(e)} />
                            </div>
                         </div>
                         <div className="row mt-3">
                            <div className="grid-container" id="more-images">
                                {
                                    moreImageFiles.map((item, ind)=>(
                                        <div className="div-parent-200 relative" key={ind}>
                                            <span className="absolute fs-bold more-img-delete" index={item?.fileName} 
                                            title="Delete image"
                                            onClick={(event)=>handleDelete(event)}
                                            style={{top: "5px", right: "5px", width:"25px", height:"25px", fontSize:"25px",
                                            zIndex: "10", color: "red", cursor: "pointer"}}>x</span>
                                            <img src={item?.img} alt="Anh Ho" />
                                        </div>
                                    ))
                                }
                            </div>
                         </div>
                     </div>
                   </div>
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

export default AddLaptop;