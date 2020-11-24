import React, {Fragment,useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import Layout from "../layout/Layout.js"
import {Container,Row,Col,Modal,Button} from "react-bootstrap"
import Input from "../UI/Input.js"
import {addProduct} from "../../redux/product/productAction.js"

function Products() {
    const [name,setName]=useState("");
    const [quantity,setQuantity]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [categoryId,setCategoryId]=useState("")
    const [productPictures,setProductPictures]=useState([])
    const categoriesData = useSelector(state => state.categoryData)
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
    console.log(productPictures);

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
            </Container>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
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
            </Layout>
        </Fragment>

    )
}

export default Products
