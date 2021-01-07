import React, {useEffect}from 'react'
import "./MenuHeader.style.css"
import { useSelector, useDispatch } from "react-redux"
import { getAllCategories } from "../../redux/category/categoryAction.js"
const MenuHeader = () => {

    const categoryData = useSelector(state => state.categoryData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    //递归算法,将category放进li
    const renderCategory=(categoriesData)=>{
        let categoryList=[];
        categoriesData.map(category=>
            categoryList.push(
                <li key={category._id}>
                    {
                        //如果没有parentId，点击之后画面就不会迁移
                        category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> : <span>{ category.name}</span>
                    }
                    {category.children.length>0?(<ul>{renderCategory(category.children)}</ul>):null}
                </li>
            )
        )
        return  categoryList
    }

    return (
        <div className="menuHeader">
            <ul>
                {categoryData.categories.length>0?renderCategory(categoryData.categories):null}
            </ul>
        </div>
    )
}

export default MenuHeader
