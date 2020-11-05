import axios from "axios"
import {GET_ALL_CATEGORIES_REQUEST,GET_ALL_CATEGORIES_SUCCESS,GET_ALL_CATEGORIES_FAILED} from "../actionTyps.js"

export const getAllCategory = () => {
    return async (dispatch) => {

        dispatch({ type: GET_ALL_CATEGORIES_REQUEST })

        const result = await axios.get("/api/category/getCategories")
        console.log(result);
        if (result.status === 200) {
            dispatch({
                type: GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: result.data.data },
            })
        } else {
            dispatch({
                type: GET_ALL_CATEGORIES_FAILED,
                //这个error并不存在，写在这里只是为了，代码的完整性，后台写api的时候应该要考虑将error传到前台。
                payload:{error:result.data.error}
            })
        }
    }
}