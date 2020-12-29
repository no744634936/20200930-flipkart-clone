import React from 'react'
import MyModal from "../../UI/Modal/MyModal.js"


const RenderDeleteCategoryModal = (props) => {
    const {
        modalTitle,
        show,
        handleClose,
        deleteCategories,
        checked_array,
        expanded_array,
    }=props
        
    return(
        <MyModal
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
            buttons={[
                {
                    label:"No",
                    color:"primary",
                    onClick:()=>{alert("no")}
                },
                {
                    label:"yes",
                    color:"danger",
                    onClick:deleteCategories
                }
            ]}
        >
            <h5>Expanded</h5>
            {
                expanded_array.map((item,index)=><span key={index}>{item.name}</span>)
            }
            <h5>Checked</h5>
            {
                checked_array.map((item,index)=><span key={index}>{item.name}</span>)
            }


        </MyModal>
    )
}


export default RenderDeleteCategoryModal;