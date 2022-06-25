/**素材请求相关模块 */
import request from '@/utils/request'

/**上传图片相关素材 */
export const uploadImage = data => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/user/images',
        //Body 参数使用data设置
        //Query 参数用params设置
        //Headers 参数使用headers设置
        //一般文件上传的接口都要求把请求体中的Content-Type
        //设置为multipart/form-data，但是使用axios上传文件
        //的话，不需要手动设置，只要给data一个ForData对象即可。
        data
    })
}

/**获取素材列表 */
export const getImages = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/images',
        //Body 参数使用data设置
        //Query 参数用params设置
        //Headers 参数使用headers设置
        //一般文件上传的接口都要求把请求体中的Content-Type
        //设置为multipart/form-data，但是使用axios上传文件
        //的话，不需要手动设置，只要给data一个ForData对象即可。
        params
    })
}

/**收藏/取消收藏素材 */
export const collectImage = (imageId, collect) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/user/images/${imageId}`,
        //Body 参数使用data设置
        //Query 参数用params设置
        //Headers 参数使用headers设置
        //一般文件上传的接口都要求把请求体中的Content-Type
        //设置为multipart/form-data，但是使用axios上传文件
        //的话，不需要手动设置，只要给data一个ForData对象即可。
        data: {
            collect
        }
    })
}

/**删除素材 */
export const deleteImage = imageId => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/user/images/${imageId}`,
        //Body 参数使用data设置
        //Query 参数用params设置
        //Headers 参数使用headers设置
        //一般文件上传的接口都要求把请求体中的Content-Type
        //设置为multipart/form-data，但是使用axios上传文件
        //的话，不需要手动设置，只要给data一个ForData对象即可。

    })
}