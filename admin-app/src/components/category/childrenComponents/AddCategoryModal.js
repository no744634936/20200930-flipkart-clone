import React from 'react'
import Input from "../../UI/Input/Input.js"
import MyModal from "../../UI/Modal/MyModal.js"


const RenderAddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        handleSave,
        title,
        categoryName,
        setCategoryName,
        setParentCategoryId,
        handleCategoryImage,
        parentCategoryId,
        CategoryList,
    }=props

    return(
        <MyModal
            show={show}
            handleClose={handleClose}
            handleSave={handleSave}
            title={title}
        >
                <Input
                    value={categoryName}
                    placeholder={`category name`}
                    onChange={e=>setCategoryName(e.target.value)}
                />

                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={e=>setParentCategoryId(e.target.value)}
                >
                    <option>select category</option>
                    {
                       CategoryList.map(option=>{
                            return <option key={option.id} value={option.id}>{option.name}</option>
                        })
                    }
                </select>

                <input type="file" name="categoryImage" onChange={handleCategoryImage}></input>
        </MyModal>
    )

}


export default RenderAddCategoryModal;