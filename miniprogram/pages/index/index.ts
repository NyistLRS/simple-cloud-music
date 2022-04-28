// index.ts
import Api from '../../api/home/index'
import { formatSongTime } from '../../utils/util'
const myaudio = wx.createInnerAudioContext()
Page({
  data: {
    isPlay:false,
    swipData: [], // banner
    personalizedList: [], // 推荐歌单
    highqualityList: [], // 精品歌单
    playlistDetailList: [],
    playingBgUrl: '', // 正在播放的背景图片
    percent: 0,
    realTime: 0,
    duration: formatSongTime(0), // 长度,单位s
    currentDuration: formatSongTime(0),
    totalLength: '', // 歌曲总时长
    indicatorDots: true,
    autoplay:true,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    this.getBannerData()
    this.getPersonalized()
    this.getHighquality()
  },
  /**
   * 获取banner数据
   */
  async getBannerData(){
    const data:any = await Api.getBannerData({
      type: 2
    })
    this.setData({
      swipData: data.banners
    })
  },
  async getPersonalized(){
    try {
      const data:any = await Api.getPersonalized({
        limit: 8
      })
      this.setData({
        personalizedList: data.result
      })
    } catch (error) {
      
    }
  },
  async getHighquality(){
    try {
      const data:any = await Api.getHighquality({
        order: 'hot',
        cat: '古风',
        limit: 10
      })
      this.setData({
        highqualityList: data.playlists
      })
      this.getPlayListDetail()
    } catch (error) {
      
    }
  },
  async getPlayListDetail(){
    try {
      const { id } = this.data.highqualityList[0]
      const data:any = await Api.getPlayListDetail({
        id
      })
      this.setData({
        playlistDetailList: data.playlist.tracks
      })
    } catch (error) {
      
    }
  },
  async getSongUrl(id:any){
    try {
      const data:any = await Api.getSongUrl({
        id
      })
      myaudio.autoplay = true
      this.setData({
        duration: '00:00',
        realTime: 0
      })
      // myaudio.playbackRate = 2 // 播放速率,0.5-2
      // console.log(data.data[0].url,'-------')
      myaudio.src = data.data[0].url
      myaudio.loop = true
      // myaudio.play()
      myaudio.onTimeUpdate(this.updateProgress.bind(this)) 
      myaudio.onSeeked(this.seekMyaudion.bind(this))
      this.setData({
        isPlay:true
      })
    } catch (error) {
      console.log(error)
    }
  },
  calcPercent(){

  },
  seekMyaudion(){
    myaudio.pause()
    myaudio.play()
  },
  updateProgress(){
    // console.log(myaudio.currentTime,myaudio.duration,this.data.duration==='00:00')
    this.setData({
      currentDuration: formatSongTime(myaudio.currentTime),
      percent: (myaudio.currentTime/myaudio.duration)*100,
      duration: formatSongTime(myaudio.duration),
      realTime: myaudio.duration
    })
  },
  /**
   * 跳转到播放页
   */
  dumpPlay(e:any){
    this.getSongUrl(e.target.dataset.detail.id)
    this.setData({
      playingBgUrl: e.target.dataset.detail.al.picUrl
    })
    
  },
  dragProgress(e:any){
    // myaudio.pause()
    this.setData({
      percent: e.detail.value
    })
    // console.log(e.detail.value*this.data.realTime/100,this.data.duration,'-------')
    myaudio.seek(e.detail.value*this.data.realTime/100)
  },
  /**
   * 暂停/播放
   */
  palyAction(){
    if(this.data.isPlay){
      myaudio.pause()
      this.setData({
        isPlay: false
      })
    }else{
      myaudio.play()
      this.setData({
        isPlay: true
      })
    }
  },
  bindDumpSearch(){
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  bindHideKeyboard(event:any){
    if(event.detail.value === '123'){
      wx.hideKeyboard()
    }
    wx.navigateTo({
      url: "/pages/playing/playing"
    })
  },
  scroll(){}
})
