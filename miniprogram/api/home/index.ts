
import request from '../request'
const baseUrl = 'http://120.78.235.174:3000'
// const baseUrl = 'http://localhost:3000'
export default {
  getBannerData: (data?:any) => {
    return request({
      url: `${baseUrl}/banner`,
      data
    })
  },
  getPersonalized:(data?:any)=>{
    return request({
      url: `${baseUrl}/personalized`,
      data
    })
  },
  /**
   * 新歌推荐
   * @param data 
   */
  getPersonalizedNewsong :(data?:any) => {
    return request({
      url: `${baseUrl}/personalized/newsong`,
      data
    })
  },
  /**
   * 精选歌单
   * @param data 
   * order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
   * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
   */
  getPlaylist :(data?:any) => {
    return request({
      url: `${baseUrl}/top/playlist`,
      data
    })
  },
  /**
   * 歌单详情 歌单id
   * @param data 
   */
  getPlayListDetail:(data?:any) =>{
    return request({
      url: `${baseUrl}/playlist/detail`,
      data
    })
  },
  /**
   * 获取歌曲url
   * @param data  id 歌曲id {br 码率，默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推}
   */
  getSongUrl:(data?:any) =>{
    return request({
      url:`${baseUrl}/song/url`,
      data
    })
  },
  /**
   * 精品歌单
   * @param data 
   */
  getHighquality: (data:any) => {
    return request({
      url:`${baseUrl}/top/playlist/highquality`,
      data
    })
  }
  
}