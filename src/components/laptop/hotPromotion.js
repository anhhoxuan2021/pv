import React, {useState, memo} from "react";

const HotPromotion = () =>{
    const [promotions, setPromotions] = useState([
        {promotion_img: 'khung_blue.png', title: 'Promotion 1' },
        {promotion_img: 'frame_purple.png', title: 'Promotion 2' },
        {promotion_img: 'khung_green.png', title: 'Promotion 3' },
        {promotion_img: 'khung_light_blue.png', title: 'Promotion 4' },
        {promotion_img: 'khung_pink.png', title: 'Promotion 5' },
        {promotion_img: 'khung_yellow.png', title: 'Promotion 6' },
        {promotion_img: 'khung-dart_blue.png', title: 'Promotion 7' },
        {promotion_img: 'khung-orange.png', title: 'Promotion 8' }
    ])
    return (
        <div className="grid-container-8-cols">
            {
            promotions.length >0? 
            promotions.map((promotion,index) => (
                <div className="d-flex flex-column text-center" key={`promtion-${index}`} style={{margin:"auto"}}>
                    <img src={require(`../../images/marketing/${promotion.promotion_img}`)}
                      style ={{width:"63px, margin: auto"}}
                    alt="anh ho design web" />
                    <div>{promotion.title}</div>
                </div>
            ))
          
            :""
            }
        </div>

    )
}

export default memo(HotPromotion)