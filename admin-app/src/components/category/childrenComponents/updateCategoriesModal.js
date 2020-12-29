import React from 'react'
import Input from "../../UI/Input/Input.js"
import MyModal from "../../UI/Modal/MyModal.js"
import {Row,Col} from "react-bootstrap"

const RenderUpdateCategoriesModal = (props) => {
    const{
        show,
        handleClose,
        handleSave,
        modalTitle,
        size,
        checked_array,
        expanded_array,
        handleCateogryEdit,
        CategoryList,

    } = props

    return(
        <MyModal 
            show={show}
            handleClose={handleClose}
            handleSave={handleSave}
            modalTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Expanded categories</h6>
                </Col>
            </Row>
                    {
                        expanded_array.length>0 && 
                        expanded_array.map((item,index)=>{
                            return(
                                <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder={`category name`}
                                        onChange={e=>handleCateogryEdit("name",e.target.value,item.id,"expended")}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={e=>handleCateogryEdit("parentId",e.target.value,item.id,"expended")}
                                    >
                                        <option>select category</option>
                                        {
                                            CategoryList.map(option=>{
                                                return <option key={option.id} value={option.id}>{option.name}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control">
                                        <option value="">select type</option>
                                        <option value="store">store</option>
                                        <option value="product">product</option>
                                        <option value="page">page</option>
                                    </select>
                                </Col>
                            </Row>
                            )
                        })
                    }
            <Row>
                <Col>
                    <h6>checked categories</h6>
                </Col>
            </Row>
                    {
                        checked_array.length>0 && 
                        checked_array.map((item,index)=>{
                            return(
                                <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder={`category name`}
                                        onChange={e=>handleCateogryEdit("name",e.target.value,item.id,"checked")}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        value={item.parentId}
                                        onChange={e=>handleCateogryEdit("parentId",e.target.value,item.id,"checked")}
                                    >
                                        <option>select category</option>
                                        {
                                            CategoryList.map(option=>{
                                                return <option key={option.id} value={option.id}>{option.name}</option>
                                            })
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select 
                                        className="form-control"
                                        value={item.type}
                                        onChange={e=>handleCateogryEdit("type",e.target.value,item.id,"checked")}
                                    >
                                        <option >select type</option>
                                        <option value="store">store</option>
                                        <option value="product">product</option>
                                        <option value="page">page</option>
                                    </select>
                                </Col>
                            </Row>
                            )
                        })
                    }
        </MyModal>
    )

}


export default RenderUpdateCategoriesModal;