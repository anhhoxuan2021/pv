import { memo } from "react";
import {Link} from 'react-router-dom';
const RightMenu = ({ lists }) => {
  return (
    <>
    
        {
            lists.map((item,index)=>{
                return(
                    <Link to={`${item.link}`}  key={index} className="row none-under">
                        <div className='row justify-content-center align-items-center a-hover'>
                            <div className="col pe-0 text-black">
                                <span>{item.title}</span>
                            </div>
                        </div>
                    </Link>                    
                )
            })
        }
   
    </>
  );
};

export default memo(RightMenu);