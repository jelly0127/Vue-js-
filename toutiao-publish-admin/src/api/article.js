/**GET方法一般用于查询操作；
 * POST一般用于添加操作；
 * PUT一般用于修改操作，局部修改；
 * DELETE一般用于删除操作
 * PATH一般用于修改操作，局部修改
 * 
 * 常见的GET是Query参数，POST是Body参数
 * 
 * 请求参数：
 * 请求头：Headers  axios默认为'Content-Type':application/json
 * 查询参数：Query
 * 请求体：Body
 * 路径参数：
 * 
 * axios中通过data选项设置Body请求体参数
 * data:{
 * mobile:'',
 * code:''
 * }
 * 
 *axios中通过params选项设置 Query参数
 Query参数也叫查询参数
 params:{
   status:2
 }

 PATH请求路径
凡是看到接口路径中有 ：xxx 格式的字段，则需要传递
 url: '/mp/v1_0/articles/:target',
 路径参数：如删除文章接口的，需传删除的文章的id号
 如：url: '/mp/v1_0/articles/${articleId}'
 */

/**文章请求相关模块 */
import request from '@/utils/request'

/**获取文章列表 */
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        //Body 参数使用data设置
        //Query 参数用params设置
        //Headers 参数使用headers设置
        params
    })
}

/**获取文章频道 */
export const getArticlesChannels = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels',
        //Body 参数使用data设置
        //Query 参数用params设置
        //Headers 参数使用headers设置
        params
    })
}

/**删除文章*/
export const deleteArticle = articleId => {
    return request({
        method: 'GET',
        //接口文档中写的路径参数需要在URL中传递
        //凡是看到接口路径中有 ：xxx 格式的字段，则需要传递
        // url: '/mp/v1_0/articles/:target',
        url: `/mp/v1_0/articles/${articleId}`,
    })
}

/**新建文章*/
export const addArticle = (data, draft = false) => {
    return request({
        method: 'POST',
        //接口文档中写的路径参数需要在URL中传递
        //凡是看到接口路径中有 ：xxx 格式的字段，则需要传递
        // url: '/mp/v1_0/articles/:target',
        url: '/mp/v1_0/articles',
        params: {
            draft //是否存为草稿（true为草稿）
        },
        data
    })

}

/**编辑文章*/
export const updateArticle =
    (articleId, data, draft = false) => {
        return request({
            method: 'PUT',
            //接口文档中写的路径参数需要在URL中传递
            //凡是看到接口路径中有 ：xxx 格式的字段，则需要传递
            // url: '/mp/v1_0/articles/:target',
            url: `/mp/v1_0/articles/${articleId}`,
            params: {
                draft //是否存为草稿（true为草稿）
            },
            data
        })
    }

/**获取指定文章*/
export const getArticle = articleId => {
    return request({
        method: 'GET',
        //接口文档中写的路径参数需要在URL中传递
        //凡是看到接口路径中有 ：xxx 格式的字段，则需要传递
        // url: `/mp/v1_0/articles/:target`,注意用反引号
        url: `/mp/v1_0/articles/${articleId}`,
    })
}


/**修改文章评论状态*/
export const updateCommentStatus =
    (articleId, allowComment) => {
        return request({
            method: 'PUT',
            //接口文档中写的路径参数需要在URL中传递
            //凡是看到接口路径中有 ：xxx 格式的字段，则需要传递
            // url: `/mp/v1_0/articles/:target`,注意用反引号
            url: '/mp/v1_0/comments/status',
            params: {
                article_id: articleId
            },
            data: {
                allow_comment: allowComment
            },
        })
    }