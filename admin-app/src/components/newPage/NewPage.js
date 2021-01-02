import React, {Fragment,useState,useEffect} from 'react'
import Layout from "../layout/Layout.js"
import Input from "../UI/Input/Input.js"
import MyModal from "../UI/Modal/MyModal.js"
import {Row,Col} from "react-bootstrap"
import linearCategories from "../../helper/linearCategories.js"
import {useDispatch,useSelector} from "react-redux"
import {createPage} from "../../redux/page/pageAction.js"

const NewPage=(props)=>{

    const [showCreateModal,setShowCreateModal]=useState(false);
    const [title,setTitle]=useState("")
    const [categories,setCategories]=useState([])
    const [categoryId,setCategoryId]=useState("")
    const [type,setType]=useState("")
    const [description,setDescription]=useState("")
    const [banners,setBanners]=useState([])
    const [products,setProducts]=useState([])
    const categoriesData = useSelector(state => state.categoryData)
    const createdBy=useSelector(state=>state.loginData.user._id)
    const dispatch=useDispatch();
    const pageData=useSelector(state=>state.pageData)

    useEffect(() => {
        setCategories(linearCategories(categoriesData.categories));
        //categoriesData是同通过app.js文件里的getInitialData方法获得的，
        //但是由于getInitialData方法是异步的需要一点时间，
        //所以当reload NewPage的时候，如果不写[categoriesData] 
        //那么categoriesData就会为空
    }, [categoriesData])


    useEffect(()=>{
        console.log(pageData);
        if(!pageData.loading){
            
            setShowCreateModal(false)
            //当创建成功之后初始化变量
            setTitle("")
            setType("")
            setProducts([])
            setBanners([])
            setDescription("")
            setCategoryId("")
        }
    },[pageData])


    const handleBannerImages=(e)=>{
        setBanners([...banners,e.target.files[0]])
    }
    const handleProductImages=(e)=>{
        setProducts([...products,e.target.files[0]])
    }

    const onCategoryChange=(e)=>{
        const category=categories.find(cate=>cate.id===e.target.value)
        setCategoryId(e.target.value)
        //为了获取type
        setType(category.type)
    }
    const submitPageForm=(e)=>{
        // e.target.preventDefault();
        if(title===""){
            alert("title is required");
            setShowCreateModal(false)
            return;
        }
        let form=new FormData();
        form.append("title",title)
        form.append("description",description)
        form.append("category",categoryId)
        form.append("type",type)
        form.append("createdBy",createdBy)

        banners.forEach((banner,index)=>{
            form.append("banners",banner)
        })
        products.forEach((product,index)=>{
            form.append("products",product)
        })

        // console.log({title,description,categoryId,type,banners,products});
        dispatch(createPage(form));
        setShowCreateModal(false);
    }
    const reanderCreatePageModal=()=>{
        // 这样写是错误的不能写在里面。
        // const [showCreateModal,setShowCreateModal]=useState(false);
        // const [title,setTitle]=useState("")
        return(
            <MyModal
                show ={showCreateModal}
                title={"create new page"}
                handleClose={()=>setShowCreateModal(false)}
                handleSave={submitPageForm}
            >
                 <Row>
                    <Col>
                        <select
                            className="form-control form-control-sm"
                            value={categoryId}
                            onChange={onCategoryChange}

                        >
                            <option>select Category</option>
                            {
                                categories.map(cate=>
                                    <option key={cate.id} value={cate.id}>{cate.name}</option>
                                )
                            }
                        </select>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            className="form-control-sm"
                            value={title} 
                            onChange={(e)=>setTitle(e.target.value)} 
                            placeholder={"page title"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            className="form-control-sm"
                            value={description} 
                            onChange={(e)=>setDescription(e.target.value)} 
                            placeholder={"description"}
                        />
                    </Col>
                </Row>
                    {
                        banners.length  > 0 &&
                        banners.map((banner,index)=>
                            <Row key={index}>
                                <Col>{banner.name}</Col>
                            </Row>
                        )
                    }
                <Row>
                    <Col>
                        <Input
                            className="form-control-sm"
                            type="file"
                            name="banners"
                            onChange={handleBannerImages}
                        />
                    </Col>
                </Row>
                
                {
                    products.length > 0 &&
                    products.map((product,index)=>
                        <Row key={index}>
                            <Col>{product.name}</Col>
                        </Row>
                    )
                }

                <Row>
                    <Col>
                        <Input
                            className="form-control-sm"
                            type="file"
                            name="products"
                            onChange={handleProductImages}
                        />
                    </Col>
                </Row> 

            </MyModal>
        )
    }



   return(
    <Layout sidebar>
        {
            pageData.loading ?
            <p>Creating page please wait...</p>:
            <Fragment>
                {reanderCreatePageModal()}
                <button onClick={()=>setShowCreateModal(true)}>create page</button>
            </Fragment>
        }

    </Layout>
   )
}

export default NewPage