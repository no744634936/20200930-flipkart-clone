import React,{useEffect,useState} from 'react'
import Layout from "../../components/layout/Layout.js"
import {Container,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import {addCategory} from "../../redux/category/categoryAction.js"
import Input from "../UI/Input/Input.js"
import "./category.style.css"
import MyModal from "../UI/Modal/MyModal.js"

const Category = props => {
    const categoriesData = useSelector(state => state.categoryData)
    const dispatch=useDispatch()

    //因为product页面也要用到categories ，所以要将dispatch(getAllCategories())
    //放到app.js 文件里面去。
    // useEffect(() => {
    //     dispatch(getAllCategories())
    // }, [])


    //递归算法,将category放进li
    const renderCategory=(categoriesData)=>{
        let categoryList=[];
        categoriesData.map(category=>
            categoryList.push(
                <li key={category._id}>
                    {category.name}
                    {category.children.length>0?(<ul>{renderCategory(category.children)}</ul>):null}
                </li>
            )
        )
        return  categoryList
    }

    //modal 的代码,我只是修改了handleClose 方法的代码。
    const [show, setShow] = useState(false);
    const handleClose = () => {
        let form=new FormData();
        form.append("name",categoryName)
        form.append("parentId",parentCategoryId)
        form.append("categoryImage",categoryImage)
        dispatch(addCategory(form))

        //将数据post到后台之后，前端表格要清空输入的数据
        setCategoryName("")
        setParentCategoryId("");

        setShow(false)
    };
    const handleShow = () => setShow(true);

    //modal 的内容
    const [categoryName,setCategoryName]=useState("");
    const [parentCategoryId,setParentCategoryId]=useState("")
    const [categoryImage,setCategoryImage]=useState("")

    //递归算法将category放进 modal里的select里的option
    const createCategoryList=(categoriesData,options=[])=>{
        categoriesData.map(category=>{
            options.push({id:category._id,name:category.name});
            if(category.children.length>0){
                createCategoryList(category.children,options)
            }
        })
        return options
    }


    const handleCategoryImage=(e)=>{
        setCategoryImage(e.target.files[0]);

    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="category">
                            <h3>Category</h3>
                            <button  onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategory(categoriesData.categories)}
                            {JSON.stringify(createCategoryList(categoriesData.categories))}
                            {/* JSON.stringify方法可以将数组直接打印到网页上面 */}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <MyModal 
                show={show}
                handleClose={handleClose}
                modalTitle={"Add New Category"}
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
                            createCategoryList(categoriesData.categories).map(option=>{
                                return <option key={option.id} value={option.id}>{option.name}</option>
                            })
                        }
                    </select>

                    <input type="file" name="categoryImage" onChange={handleCategoryImage}></input>
            </MyModal>
        </Layout>
    )
}



export default Category
