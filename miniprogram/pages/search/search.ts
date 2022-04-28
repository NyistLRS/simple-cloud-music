// pages/search/search.ts
import Api from '../../api/search/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    searchList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      history: this.getHistory(wx.getStorageSync('history'))
    })
  },
  getHistory(storeStr:any){ // 得到搜索记录
    return storeStr && storeStr.split(',')||[]
  },
  confirm(e:any){ //
    const oldHistory:any = this.data.history
    const value = e.detail.value
    this.setData({
      history: oldHistory.concat(value)
    })
    console.log(this.data.history)
    wx.setStorageSync('history',this.data.history.join(","))
    this.search(value)
  },
  clearHistory(){
    this.setData({
      history:[]
    })
    wx.removeStorageSync('history')
  },
  async search(keywords:any){
    try {
      const oldSearchResult = this.data.searchList
      console.log(oldSearchResult,'oldSearchResult')
      const data:any = await Api.search({
        keywords,
        offset: 1,
        limit: 20
      })
      this.setData({
        searchList: [].concat(data.result.songs)
      })
      console.log(this.data.searchList,'newSearchResult')
    } catch (error) {
      
    }
  },
  
  play(){
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})