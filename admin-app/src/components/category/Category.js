import React,{useEffect,useState} from 'react'
import Layout from "../../components/layout/Layout.js"
import {Container,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import {getAllCategories,addCategory,updateCategories,deleteCate} from "../../redux/category/categoryAction.js"
import "./category.style.css"
import CheckboxTree from "react-checkbox-tree"
import { 
    IoIosCheckbox,
    IoIosCheckboxOutline,
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload,

 } from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { LOGIN_FAILED } from '../../redux/actionTypes.js'
import RenderUpdateCategoriesModal from "./childrenComponents/UpdateCategoriesModal.js"
import RenderAddCategoryModal from "./childrenComponents/AddCategoryModal.js"
import RenderDeleteCategoryModal from "./childrenComponents/DeleteCategoryModal.js"

const Category = props => {
    const categoriesData = useSelector(state => state.categoryData)
    const dispatch=useDispatch()

    //因为product页面也要用到categories ，所以要将dispatch(getAllCategories())
    //放到app.js 文件里面去。
    // useEffect(() => {
    //     dispatch(getAllCategories())
    // }, [])


    //react-checkbox-tree 的代码
    //点击的category都会放进checked数组，
    //扩张出来的所有category项目会被放进expanded数组,expanded 就是第一层，第二层的意思
    const [checked,setChecked]=useState([]);
    const [expanded,setExpanded]=useState([]);

    const [checked_array,set_checked_array]=useState([]);
    const [expanded_array,set_expanded_array]=useState([]);

    //递归算法,将category放进categoryList
    const renderCategory=(categoriesData)=>{
        let categoryList=[];
        categoriesData.map(category=>
            //https://www.npmjs.com/package/react-checkbox-tree 根据这个library格式来写的
            categoryList.push(
                {
                    label:category.name,
                    value:category._id,
                    children: category.children.length >0 && renderCategory(category.children) 
                }
            )
        )
        return  categoryList
    }

    //add modal 的代码,我只是修改了handleClose 方法的代码。
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false)};
    const handleShow = () => {setShow(true);}

    const handleNewSave=()=>{
        let form=new FormData();
        form.append("name",categoryName)
        form.append("parentId",parentCategoryId)
        form.append("categoryImage",categoryImage)
        console.log("categoryImage",categoryImage);
        dispatch(addCategory(form))

        //将数据post到后台之后，前端表格要清空输入的数据
        setCategoryName("")
        setParentCategoryId("");

        setShow(false)
    }

    //modal 的内容
    const [categoryName,setCategoryName]=useState("");
    const [parentCategoryId,setParentCategoryId]=useState("")
    const [categoryImage,setCategoryImage]=useState("")

    //递归算法将category放进 modal里的select里的option
    const createCategoryList=(categoriesData,options=[])=>{
        categoriesData.map(category=>{
            options.push({id:category._id,name:category.name,parentId:category.parentId,type:category.type,});
            if(category.children.length>0){
                createCategoryList(category.children,options)
            }
        })
        return options
    }

    const handleCategoryImage=(e)=>{
        setCategoryImage(e.target.files[0]);

    }

    // edit modal
    const [editShow,setEditShow]= useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => {
        getCheckedAndExpanded()
        setEditShow(true)
    };

    const　getCheckedAndExpanded=()=>{
        let categories=createCategoryList(categoriesData.categories);
        //点击的category都放进checked
        //checked,expanded 数组里面都是id
        console.log("checked and expanded",checked,expanded,categories);

        let checked_array=[]

        //&& 是 if  checked.length >0 的意思
        checked.length >0 && checked.forEach((checked_categoryId,index)=>{
            //find 返回的是array中找到的第一个元素。
            let category=categories.find((category,_index)=>{
                return checked_categoryId===category.id
            })
            category && checked_array.push(category)
        })

        let expanded_array=[]
        expanded.length >0 && expanded.forEach((expanded_categoryId,index)=>{
            //find 返回的是array中找到的第一个元素。
            let category=categories.find((category,_index)=>{
                return expanded_categoryId===category.id
            })
            category && expanded_array.push(category)
        })
        console.log("-----------------------");
        console.log(expanded_array);
        console.log(checked_array);
        
        
        set_checked_array(checked_array)
        set_expanded_array(expanded_array)

    }

    const handleCateogryEdit=(key,value,id,type)=>{

        if(type=="checked"){

            //index ===_index ? {...item,[key]:value}: item 的意思是如果条件为true就修改item，否则就返回原本的item
            let update_checked_arr=checked_array.map((item)=> item.id ===id ? {...item,[key]:value}: item)
            
           //将修改的内容放到update_checked_arr数组里去。然后又通过handleEditShow 方法将修改后的数据显示出来
            set_checked_array(update_checked_arr)
            console.log("checked_arr",update_checked_arr);
            
        }else if(type=="expended"){
            let update_expanded_arr=expanded_array.map((item)=> item.id ===id ? {...item,[key]:value}: item)
            //将修改的内容放到update_expanded_arr数组里去。然后又通过handleEditShow 方法将修改后的数据显示出来
            set_expanded_array(update_expanded_arr)
        }



    }

    const updateCategoriesForm=()=>{
        let form=new FormData();
        expanded_array.forEach(item=>{
            form.append('id',item.id);
            form.append('name',item.name);
            form.append('parentId',item.parentId ? item.parentId : '');
            form.append('type',item.type);
        })


        checked_array.forEach(item=>{
            form.append('id',item.id);
            form.append('name',item.name);
            form.append('parentId',item.parentId ? item.parentId : '');
            form.append('type',item.type);
        })
        //let form=new FormData(); form 是不能被打印的，会显示为空
        //console.log("form",form);

        //要像这样
        // for (const [key, value] of form.entries()) {
        //     console.log(`${key}: ${value}`);
        // }

        dispatch(updateCategories(form))
        setEditShow(false);
    }

    //delete category
    const[deleteCategoryModal,setDeleteCategoryModal]=useState(false)

    const deleteCategories=()=>{
        // 
        const checkedIdArray=checked_array.map(item=>({id:item.id}));
        const expandedIdArray=expanded_array.map(item=>({id:item.id}));
        const idsArray=checkedIdArray.concat(expandedIdArray)
        console.log(idsArray);

        if(checkedIdArray.length>0){
            //dispatch(deleteCate(idsArray)) 执行之后 会return true 或者 false
            //true是从deleteCate(idsArray) 方法里返回过来的
            dispatch(deleteCate(checkedIdArray)).then(result=>{
                //当result等于 true的时候 刷新categories 并关闭页面
                if(result){
                    dispatch(getAllCategories())
                    setDeleteCategoryModal(false)
                }
            });
        }
    }

    const deleteCategory=()=>{
        getCheckedAndExpanded()
        setDeleteCategoryModal(true)
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

                        <CheckboxTree
                            nodes={renderCategory(categoriesData.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked )}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox></IoIosCheckbox>,
                                uncheck: <IoIosCheckboxOutline></IoIosCheckboxOutline>,
                                halfCheck: <IoIosCheckboxOutline></IoIosCheckboxOutline>,
                                expandClose: <IoIosArrowForward></IoIosArrowForward>,
                                expandOpen: <IoIosArrowDown></IoIosArrowDown>,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <button onClick={deleteCategory}>Delete</button>
                    <button onClick={handleEditShow}>Edit</button>
                    </Col>
                </Row>
            </Container>

            {/* 添加category */}
            <RenderAddCategoryModal
                show={show}
                handleClose={handleClose}
                handleSave={handleNewSave}
                modalTitle={"Add New Category"}
                size={"lg"}
                setCategoryName={setCategoryName}
                setParentCategoryId={setParentCategoryId}
                handleCategoryImage={handleCategoryImage}
                CategoryList={createCategoryList(categoriesData.categories)}
            >
            </RenderAddCategoryModal>

            {/* 修改category */}
            <RenderUpdateCategoriesModal
                show={editShow}
                handleClose={handleEditClose}
                handleSave={updateCategoriesForm}
                modalTitle={"edit Category"}
                size={"lg"}
                checked_array={checked_array}
                expanded_array={expanded_array}
                handleCateogryEdit={handleCateogryEdit}
                CategoryList={createCategoryList(categoriesData.categories)}
            />

            {/* 删除category */}
            <RenderDeleteCategoryModal
                modalTitle={"Comfirm"}
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                deleteCategories={deleteCategories}
                checked_array={checked_array}
                expanded_array={expanded_array}
            >
            </RenderDeleteCategoryModal>

        </Layout>
    )
}



export default Category
