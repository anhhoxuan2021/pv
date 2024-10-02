import React, {useEffect, useState} from "react";
import styles from '../css/pagination.module.css'

const Pagination=({totalPg, currentPg, maxVisibleButtons, pagechanged})=>{   
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage,setCurrentPage] = useState(1)

    useEffect(()=>{
        setTotalPages(totalPg)
        setCurrentPage(currentPg)
    },[maxVisibleButtons, totalPg, currentPg])

    const startPage = () => {
        if (currentPage === 1) {
          return 1;
        }
  
        if (currentPage === totalPages) {
          return totalPages - maxVisibleButtons +1;
        }  
        // When inbetween
      return currentPage - 1;
      }

     const pages = () => {
        const range = [];
        for (
          let i = startPage();       
          i <= Math.min(startPage() + maxVisibleButtons - 1, totalPages);
          i++
        ) {
          range.push({
            name: i,
            isDisabled: i === currentPage?true:false
          });
        }
        return range;
      }

      const isInFirstPage = () => {
        return currentPage === 1?true:false;
      }

      const isInLastPage =() =>{
        return currentPage === totalPages?true:false;
      }

      const  isPageActive = (page) =>{
       return  currentPage === page?true:false;
      }

      return(
        <>
            <ul className={`${styles.cus_pagination} d-flex justify-content-center`}>
                <li className={styles.pagination_item}>
                    <button type="button" onClick={()=>pagechanged(1)} disabled = {isInFirstPage()}  >  First </button>
                </li>

                <li className={styles.pagination_item}>
                    <button type="button" onClick={()=>pagechanged(1)}   disabled = {isInFirstPage()} >  Previous </button>
                </li>

               { /**Visible Buttons Start  */}
               {
                pages().length > 0? 
                pages().map((page,indx) => (
                    <li className="pagination-item" key= {`pag-${indx}`}>
                        <button className= {isPageActive(page.name)? `${styles.active} ${styles.w_40px}` : styles.w_40px }type="button"
                            onClick= {() => pagechanged(page.name)}  disabled= {page.isDisabled}
                           > { page.name }
                        </button>
                    </li>
                )):""
               }               

                {/* Visible Buttons End*/}

                <li className={styles.pagination_item}>
                    <button type="button" onClick={()=> pagechanged(currentPage + 1)}  disabled={isInLastPage()}> Next </button>
                </li>

                <li className={styles.pagination_item}>
                    <button type="button" onClick={()=>pagechanged(totalPages)} disabled={isInLastPage()}> Last</button>
                </li>
            </ul>
        </>
      )

}

export default Pagination