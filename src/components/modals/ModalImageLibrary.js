import React, { memo, useState,useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import $  from "jquery";

import {getAllImagesByType} from '../../api/productService'

import NoneImg from '../../images/qcode.png'
import EditIcon from "../../images/edit_icon.svg"

import {filesUpload} from '../../api/productService'

 const path_img1 = 'http://localhost:8001/images/laptop/'

var eventTransfer =''
const MaxCount = 4
// const ImageLabrary = () => {
    const ImageLabrary = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
  
    const moreImagesRef = useRef('');

    const [moreImageFiles, setMoreImageFiles] = useState([]) 
    const [filesFlag, setFilesFlag] = useState(false);

    const [initialImg, setInitialImg] = useState([]) 

    ////////////Trigger input file//////////////
    const triggerInputeFile = (event) => {
        event.preventDefault();
        moreImagesRef.current.click();
        }
    
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

      /////////////////
    const handleDelete =(e)=>{
        e.preventDefault(); 
        let newState = moreImageFiles.filter(item => item.fileName !== e.target.getAttribute('index'))
        
        if(newState.length <1)  setFilesFlag(false) 
        setMoreImageFiles(newState)
    }

     /////////////////
    const handleClose = () => setShow(false);

    /////////////////
    useImperativeHandle(ref, () => {       
        return {
            imageLibrayShow(event) {              
              setMoreImageFiles([])              
                setShow(true);
                eventTransfer = event
          }
        };
      }, []);

      useEffect(()=>{
        getAllImagesByType(props.folder).then(data =>{ 
          setInitialImg(data)

          $('#library-images').on('click','.select-image',function(){
            if($(this).hasClass('selected')){
              $(this).removeClass('selected')
            }else{
              if($(eventTransfer.target).closest('.div-image').hasClass('one-image')){
                $('.library-modal .selected').removeClass('selected')
                $(this).addClass('selected')
              }else{
                $(this).addClass('selected')
              }
             
            }                  
          })
        })
      },[show])

    
     /////////////////upload file to server
    const handleSave = async (e) => {
      
        e.preventDefault();
        const moreImgs = moreImageFiles
        setMoreImageFiles([])
        if(filesFlag){
            let filesupload =[]
            moreImgs.map(item => (
                filesupload.push(item.files)
            ))

            let files = {more_imgs: filesupload, folder: props.folder}

       await filesUpload(files).then(data =>{
 
        if(data.message === 'successfully'){      
          $('#images-for-upload').html('')
            var div = ''
            if(data.more_image.length){
                data.more_image.forEach(function(item){
                    let img = path_img1+item
               div +='<div class="div-parent-100 relative library-modal">'+
                    '<img class="select-image" style="cursor:pointer" src='+img+' alt="item" title="'+item+'" />'+
                '</div>'
                });

                $('#library-images').append(div) 
                /////
            }

            setFilesFlag(false)    
        }
       })
        }
    }
    //////////////Add image to attribute component////////////////////
    const handleAddImage = (e) => {   
      var parentDiv = $(eventTransfer.target).closest('.div-image')   
      $('.library-modal .selected').each(function(){
          let imageName = $(this).attr('title')
          let img = path_img1+imageName
          if(parentDiv.hasClass('one-image')){
            let div ='<div class="div-parent-100 relative library-modal">'+
              '<div class="absolute fs-bold delete-image-selected text-right" title="Delete image"'+
              'style= "top: -10px; left:50%; width: 45px; height:45px; z-index:10; color: red; cursor: pointer; font-size: 35px">x</div>'+
               '<img class="select-image for-one" style="cursor:pointer" src='+img+' alt="item" title="'+imageName+'" />'+
            '</div>'
          
            parentDiv.find('.slected-image').html(div)
            
            $('.slected-image').on('click','.delete-image-selected', function(){
              $(this).closest('.library-modal').remove()
           })
          }else{ //slected-images
            let div ='<div class="div-parent-100 relative library-modal">'+
            '<div class="absolute fs-bold delete-image-selected text-right" title="Delete image"'+
            'style="top: -10px; left:50%; width: 45px; height:45px; z-index:10; color: red; cursor: pointer; font-size: 35px">x</div>'+
                  '<img class="select-image for-many" style="cursor:pointer" src='+img+' alt="item" title="'+imageName+'" />'+
              '</div>'

              parentDiv.find('.slected-images').append(div)

              $('.slected-images').on('click','.delete-image-selected', function(){
                console.log('testtt')
                 $(this).closest('.library-modal').remove()
              })
          }
      })

      setShow(false); //close modal
    }
  
    return (
      <> 
        <Modal show={show} onHide={handleClose}  size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Library Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row">
            <div className="col text-center">                    
                    <div className='col relative'>
                    <div className='div-parent-100 relative'>
                    
                    <img className='h-35 z-index-20 absolute' src={EditIcon}  alt="Edit" onClick={(e)=>triggerInputeFile(e)} />
                    </div> 
                    <input  className="form-control" type="file" multiple="multiple" name="files[]" id="more_files" 
                                accept="image/*" ref ={moreImagesRef}
                                onChange={(e)=>loadMoreImages(e)}
                                hidden />
                    </div>
                    <Form.Label>Choose Images</Form.Label>
             </div>
             </div>

             <div className="row mt-3">
            <div className={filesFlag?"grid-container border-top": "grid-container"}  id="images-for-upload">
                {
                    moreImageFiles.map((item, ind)=>(
                        <div className="div-parent-200 relative" key={ind}>
                            <div className="absolute fs-bold more-img-delete" index={item?.fileName} 
                            title="Delete image"
                            onClick={(event)=>handleDelete(event)}
                            style={{top: "7px",left:"75%" ,width:"45px", height:"45px", fontSize:"35px",
                            zIndex: "10", color: "red", cursor: "pointer"}}>x</div>
                            <img src={item?.img} alt="Anh Ho" />
                        </div>
                    ))
                }
            </div>
            </div> 
            <>
            {
               filesFlag? (<div className="row my-2  border-top"> 
                    <div className="col text-center pt-3">
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button> &nbsp;&nbsp;&nbsp;
                    <Button variant="primary" onClick={(e)=>handleSave(e)}>
                      Upload Images
                    </Button>
                    </div>
               </div>):""
            }
            </>
            {/*show img from api return */}
          <div className="row mt-3 border-top" >            
            <label className ="row my-1 f-18 f-18 text-success">Available Images</label>
              <div className="grid-container-6-cols" id="library-images">
                  {
                    initialImg.length > 0? initialImg.map((item,index) => (
                      <div className="div-parent-100 relative library-modal" key={`img-${item.img_id}`}>
                       <img className="select-image" style={{cursor:"pointer"}} src={path_img1+item.img_name} alt="anh ho" title={item.img_name} />
                     </div>
                    )): ''
                  }
              </div>

          </div>

          <div className="row" >            
            <div className="col text-center">
            <Button variant="primary" onClick={(e)=>handleAddImage(e)}>
                  Add Image
                </Button>
            </div>
          </div>
          </Modal.Body>
          
        </Modal>
      </>
    );
  })
  

export default memo(ImageLabrary)