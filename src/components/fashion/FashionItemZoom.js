import React, {createRef } from "react";
import styles from '../../css/carousel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import $ from 'jquery';
const path_img1 = 'http://localhost:8001/images/'

class FashionItemZoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            libraryImages: [],
            libraryImagesSelected:0
        };

    }
    /*****************ZOOM************** */
    source = createRef();
    target = createRef();
    cursor =createRef();
    /************************************/

    static getDerivedStateFromProps(nextProps, prevState){       
        if(nextProps.proplibraryImages!==prevState.libraryImages){  
            if(nextProps.proplibraryImages !=='' && nextProps.proplibraryImages?.includes(",")){
                let temp = nextProps.proplibraryImages.split(",") 
                return  {
                    libraryImages: temp 
                }
            }else if(nextProps.proplibraryImages !==''){
              
                return  {
                    libraryImages: [nextProps.proplibraryImages] 
                }                 
            }
        }
        return null;
    }

       //--carousel--
       modulo(number, mod) {
        let result = number % mod;
        if (result < 0) {
            result += mod;
        }
        return result;
    }

        setUpCarousel(carousel) {
        let $this = this
        function handleNext() {
            let slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
           let numSlides = slidesContainer.children.length;
            slidesContainer.children[currentSlide].setAttribute('aria-hidden',true) 
            currentSlide = $this.modulo(currentSlide + 1, numSlides);
            slidesContainer.children[currentSlide].setAttribute('aria-hidden',false)

            selectedLibaryImgByCurrentSlice(currentSlide)
            changeSlide(currentSlide);
        }

        function handlePrevious() {
            let slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
           let numSlides = slidesContainer.children.length;
            slidesContainer.children[currentSlide].setAttribute('aria-hidden',true)
            currentSlide = $this.modulo(currentSlide - 1, numSlides);
            slidesContainer.children[currentSlide].setAttribute('aria-hidden',false)

            selectedLibaryImgByCurrentSlice(currentSlide)
            changeSlide(currentSlide);
        }

        function changeSlide(slideNumber) {
            let slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
           let numSlides = slidesContainer.children.length;
            // change current slide
            carousel.style.setProperty('--current-slide', slideNumber);

            // handle screen reader accessibility
            const previousSlideNumber = $this.modulo(slideNumber - 1, numSlides);
            const nextSlideNumber = $this.modulo(slideNumber + 1, numSlides);
            const previousSlide = slidesContainer.children[previousSlideNumber];
            const currentSlideElement = slidesContainer.children[slideNumber];
            const nextSlide = slidesContainer.children[nextSlideNumber];

            previousSlide.setAttribute('aria-hidden', true);
            nextSlide.setAttribute('aria-hidden', true);
            currentSlideElement.setAttribute('aria-hidden', false);
        }

        function slectedSlice(currentSlide){
            let slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
            let numSlides = slidesContainer.children.length;
            slidesContainer.children[currentSlide].setAttribute('aria-hidden',true)
            slidesContainer.children[currentSlide].setAttribute('aria-hidden',false)
            changeSlide(currentSlide);
        }

        function selectedLibaryImgByCurrentSlice(currentSlide){
            $('#fashion-libray-img-left .fashion-libray-img').each(function(index,item){
                if(index==currentSlide){
                    $('.product-libary-img.selected').removeClass('selected')
                    $(this).find('.product-libary-img').addClass('selected')
                }
                //console.log(index)
                //console.log(item)
            })
        
        }

        // get elements
        const buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
        const buttonNext = carousel.querySelector('[data-carousel-button-next]');
        //const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
        

        let currentSlide = 0;
        //const numSlides = slidesContainer.children.length;

        // set up events
        buttonPrevious.addEventListener('click', handlePrevious);
        buttonNext.addEventListener('click', handleNext);
        //review library image
        $('.normal-id').on('click','.fashion-libray-img',function(){
        $('.product-libary-img.selected').removeClass('selected')
        $(this).find('.product-libary-img').addClass('selected')
           // console.log($(this).attr('slide_index'))
           let sliceIndex = parseInt($(this).attr('slide_index'))
           slectedSlice(sliceIndex)

        });
    }


    componentDidMount(){
        let $this = this
            const carousels = document.querySelectorAll('[data-carousel]');
            carousels.forEach(function(item){
          //      $this.setUpCarousel(item)
               
            });

            $('.specific-product .product-images').off('click').on('click',function(){
                $('.specific-product .prd-size.selected').removeClass('selected')
                $('.specific-product .prd-size:first-child').addClass('selected')
            })
  
            
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(this.props.proplibraryImages !== prevState.proplibraryImages){

    //     }
    // }

    render(){
        return(
            <>
                <div className={styles.carousel} role="group" aria-roledescription="carousel" data-carousel aria-label="anh ho" style={{cursor: "pointer"}}>
                    <div className={styles.carousel_buttons}>
                        <button className={`${styles.carousel_button} ${styles.carousel_button_previous}`}
                            aria-label="Previous slide"
                            data-carousel-button-previous
                            >
                                <FontAwesomeIcon icon={['fas', 'fa-chevron-circle-left']} />   
                        </button>
                        <button className= {`${styles.carousel_button} ${styles.carousel_button_next}`}
                            aria-label="Next slide"
                            data-carousel-button-next
                            >
                                <FontAwesomeIcon icon={['fas', 'fa-chevron-circle-right']} />   
                        </button>
                    </div>
                    <div className={styles.slides}
                        aria-live="polite"
                        data-carousel-slides-container >
                     {
                        this.state.libraryImages.map((slice_img, index)=>(
                        <div className={styles.slide}
                        role="group"
                        aria-roledescription="slide"
                        aria-hidden="true"
                        key={`slice-${index}`}>
                        <div className={styles.content}>
                            <div className="img-div h-900">
                                <img src={`${path_img1}/${slice_img}`} alt="Anh Ho" />
                            </div>
                            </div>
                        </div>
                            ))
                        }
                    </div>

                </div>
                <div ref={this.cursor} className="pointer_events_none absolute border"></div>
                <canvas ref = {this.target} className="border pointer_events_none absolute w-64 h-64 translate-y-0-5 translate-x-0-5 left-0-5 z-index-20"></canvas>
          
     {/*Left */}         
    <div  className= {`d-flex flex-column fit-box ${styles.leftAbsolute}`} id="fashion-libray-img-left" >{
        this.state.libraryImages.map((libryImg, index)=>(
            <span  className="fashion-libray-img prd-img-page mb-2"  key={`libryImg_${libryImg}`} 
            style={{cursor: "pointer"}}
            slide_index={index} >            
                <img 
                className={this.state.libraryImagesSelected===index? 'img-thumbnail product-libary-img selected':'img-thumbnail product-libary-img'}
                src={`${path_img1}/${libryImg}`} alt="Thiet ke web Anh Ho" />
            </span>
        ))
        }
        
        
     
    </div>
            </>
        )
    }
    
}

export default FashionItemZoom;

