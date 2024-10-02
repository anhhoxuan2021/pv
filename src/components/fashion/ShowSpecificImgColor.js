import React, {useState, useEffect, memo} from 'react';
import $ from 'jquery';

const ShowSpecificImgColor = ({sameImages, isClass,getProductImgIndex})=>{
    const path_img1 = 'http://localhost:8001/images/'
    const [color, setColor] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        if(sameImages.length > 0){
            setColor(sameImages[index].color)
        }else{
            setColor('') 
        }
    },[sameImages, index])

    useEffect(()=>{
        // $('.normal-id').on('click','.product-images-span',function(){
        //     $('.product-images.selected').removeClass('selected')
        //     $(this).find('.product-images').addClass('selected')
        // })
        // $('.specific-product').on('click','.prd-size',function(){
        //     $('.specific-product .prd-size.selected').removeClass('selected')
        //     $(this).addClass('selected')
        // })
    })

    const  changeFashionCarousel=(value)=>{               
       // this.$emit('getProductImgIndex', value);
       getProductImgIndex(value)
       setIndex(value)
    }

    return(
        <>
        <div className="f-15 my-3">Select color: <strong className="color-selected">{color}</strong></div>
        <div  className={isClass?"pb-3 d-flex flex-row fit-box":"d-flex flex-row fit-box"} >                    
            {
                sameImages.map((img, index1)=>(
                    <span  className={isClass?"prd-img-page product-images-span me-1":"prd-img-page product-images-span"} 
                    key={`img-${index1}`} onClick={()=>changeFashionCarousel(index1)}>
                        <img 
                        className= {index ===index1?"img-thumbnail product-images selected":"img-thumbnail product-images"} 
                        src={`${path_img1}/${img.image}`} alt="Thiet ke web Anh Ho" specificimage= {img.image}  />
                    </span>
                ))
            }
            
        </div>
        </>
    )

}

export default memo(ShowSpecificImgColor)
