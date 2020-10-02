/**
 * @description api 请求失败信息集合
 * @author zhanghaifeng
 */



module.exports={
    email_exist:{errnum:1000,message:"邮箱已被占用"},
    user_name_exist_info:{errnum:10001,message:"用户名已存在"},
    user_name_not_exist_info:{errnum:10002,message:"用户名不存在"},
    register_failed_info:{errnum:10003,message:"注册用户失败"},
    data_validataion_failed:{errnum:10004,message:"数据格式验证失败"},
    login_failed_info:{errnum:10005,message:"登录失败"},
    login_check_failed:{errnum:10006,message:"未登录"},
    delete_test_data_failed:{errnum:10007,message:"删除测试数据失败"},
    upload_file_failed:{errnum:10008,messages:"上传文件过大"},
    change_Info_failed:{errnum:10009,messages:"修改失败"},
    create_profile_failed:{errnum:10010,messages:"创建简历失败"},
    follow_failed:{errnum:10011,messages:"关注失败"},
    password_wrong:{errnum:10012,messages:"密码错误"},
    record_not_exist:{errnum:10013 ,messages:"查询记录不存在"},
    system_error:{errnum:10014 ,messages:"系统错误"},
    create_post_failed:{errnum:10015 ,messages:"无法添加post"},
    no_auth_error:{errnum:10016 ,messages:"not auhorized,没有权限删除，不是本人"},
    already_liked:{errnum:10017 ,messages:"已经赞过了"},
    not_liked:{errnum:10018 ,messages:"还没点赞"},
    comment_not_exist:{errnum:10019 ,messages:"该评论不存在"},
    email_not_exist:{errnum:1000,message:"邮箱不存在"},
}