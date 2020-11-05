import React,{Fragment,useEffect} from 'react'
import Layout from "../layout/Layout.js"
import {useDispatch,useSelector} from "react-redux"
import {getAllCategory} from "../../redux/category/categoryAction.js"


function Category() {

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            //调用getAllCategroy方法获取数据
            dispatch(getAllCategory())
        }
    }, [])

    const categoryData = useSelector(state => state.categoryData);

    //递归的思想
    const renderCategories = (categories) => {
        let categoryList = [];
        categories.forEach(category => {
            categoryList.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (
                        <ul>
                            {renderCategories(category.children)}
                        </ul>
                    ):null}
                </li>
            )
        })
        return categoryList
    }

    return (
        <Fragment>
            <Layout>
                <div>
                    <h1 className="display-4">test</h1>
                    <ul>
                        {renderCategories(categoryData.categories)}
                    </ul>
                </div>

                {/* Button trigger modal  */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
                </button>

                {/* Modal  */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </Layout>


        </Fragment>
    )
}

export default Category
