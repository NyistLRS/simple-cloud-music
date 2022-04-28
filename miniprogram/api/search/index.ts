import request from '../request'
const baseUrl = 'http://120.78.235.174:3000'
export default {
  multimatch: (data:any) => {
    return request({
      url: `${baseUrl}/search/multimatch`,
      data
    })
  },
  suggest:(data:any) =>{
    return request({
      url: `${baseUrl}/search/suggest`,
      data
    })
  },
  search:(data:any) =>{
    return request({
      url: `${baseUrl}/search`,
      data
    })
  }
}