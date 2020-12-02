import React, {Fragment,useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Layout from "../layout/Layout.js"
import {Container,Row,Col,Modal,Button,Table} from "react-bootstrap"
import Input from "../UI/Input/Input.js"
import {addProduct} from "../../redux/product/productAction.js"
import "./product.style.css"

function Products() {
    const [name,setName]=useState("");
    const [quantity,setQuantity]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [categoryId,setCategoryId]=useState("")
    const [productPictures,setProductPictures]=useState([])
    const [productDetail,setProductDetails]=useState({})
    const [productDetailModal,setProductDetailModal]=useState(false)
    const categoriesData = useSelector(state => state.categoryData)
    const productsData=useSelector(state=>state.productData)

    const dispatch=useDispatch();

    //modal 的代码,我只是修改了handleClose 方法的代码。
    const [show, setShow] = useState(false);
    const handleClose = () => {
        let form=new FormData();  //不能用console.log 答应出form的内容，

        form.append("name",name)
        form.append("quantity",quantity)
        form.append("price",price)
        form.append("description",description)
        form.append("category",categoryId)
        productPictures.map(picture=>{
            form.append("productPicture",picture)
        })

        form.forEach((value, key) => {
            console.log("key %s: value %s", key, value);
        })
        //启动redux里面添加product的方法。
        dispatch(addProduct(form))
        setShow(false)
    };
    const handleShow = () => setShow(true);

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

    const handleProductPictures=(e)=>{
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }
    //添加product的表格
    const renderAddProductModal=()=>{
        return(
                <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder={"product name"}
                        onChange={e=>setName(e.target.value)}
                    />
                    <Input
                        label="Quantity"
                        value={quantity}
                        placeholder={"Quantity"}
                        onChange={e=>setQuantity(e.target.value)}
                    />
                    <Input
                        label="Price"
                        value={price}
                        placeholder={"Price"}
                        onChange={e=>setPrice(e.target.value)}
                    />
                    <Input
                        label="Description"
                        value={description}
                        placeholder={"Description"}
                        onChange={e=>setDescription(e.target.value)}
                    />
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={e=>setCategoryId(e.target.value)}
                    >
                        <option>select category</option>
                        {
                            createCategoryList(categoriesData.categories).map(option=>{
                                return <option key={option.id} value={option.id}>{option.name}</option>
                            })
                        }
                    </select>
                    {
                        productPictures.length>0 ? 
                            productPictures.map((pic,index)=><div key={index}>{pic.name}</div>):null
                    }
                    <input type="file" name="productPicture" onChange={handleProductPictures}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    //显示products的表格
    let renderProducts=()=>{
        return(
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            productsData.products.length>0?
                            productsData.products.map(product=>
                                <tr key={product._id} onClick={()=>showProductDetailsModal(product)}>
                                    <td>2</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{}</td>
                                </tr>
                            ):null
                    }

                </tbody>
            </Table>
        )
    }


    //product detail modal
    const handleCloseProductDetailsModal=()=>{
        //关闭modal
        setProductDetailModal(false);
    }

    const showProductDetailsModal=(product)=>{
        //这句话是显示modal
        setProductDetailModal(true)
        setProductDetails(product)
        // console.log("thisthis",product);
    }
    const renderProductDetailModal=()=>{
        //当商品一览页面加载，productDetail这个变量也会加载，
        //但是这时因为我没有点击记录，就还没有触发showProductDetailsModal()这个功能
        //productDetail里面就还没有数据，就位空object {}
        //productDetail.name  就会为undefined
        //productDetail.category.name 就会报 can not read propoty name of undefined
        
        console.log("shit",productDetail);
        console.log(productDetail.name);

        //这个if是判断当productDetail为空时，什么都不做。
        if(Object.keys(productDetail).length<=0){
            return null;
        }

        return(
            //注意这里的show里面是productDetailModal。
            <Modal size="lg"show={productDetailModal} onHide={handleCloseProductDetailsModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>product details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetail.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetail.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetail.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetail.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">description</label>
                        <p className="value">{productDetail.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">product pictures</label>
                        <div style={{display:"flex"}}>
                        {
                            
                            productDetail.productPictures.map(picture=>
                                <div className="productImgContainer" key={picture._id}>
                                    <img src={`${picture.img}`}/>
                                </div>
                            )
                        }
                        </div>

                    </Col>
                </Row>
            
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseProductDetailsModal}>
                    close
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
    return (
        <Fragment>
            <Layout sidebar>
            <Container>
                <Row>Product
                    <Col md={12}>
                        <div className="category">
                            <h3>Product</h3>
                            <button  onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col>
                    {renderProducts()}
                </Col>
                </Row>
            </Container>
                {renderAddProductModal()}
                {renderProductDetailModal()}
            </Layout>
        </Fragment>

    )
}

export default Products
