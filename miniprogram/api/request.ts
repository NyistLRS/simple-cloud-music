function request(params:any){
  return new Promise((resolve:any,reject:any) => {
    wx.request({
      ...params,
      success: (res) => {
        resolve(res.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export default request