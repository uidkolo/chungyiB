//app.js
App({
  onLaunch: function() {
    this.getShareInfo()
  },
  globalData: {

  },
  // 获取分享信息
  getShareInfo(){
    let url = '/api/public/shopShareData'
    this.post(url).then(data=>{
      wx.setStorageSync('shareInfo', data)
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://cy.nulizhe.com${url}`,
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data: data == undefined ? {} : data,
        success: res => {
          if (res.data.code == 1) {
            if (res.data.data) {
              resolve(res.data.data)
            } else {
              resolve()
            }
          } else {
            if (res.data.message.indexOf('重新登录') != -1) {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
                success: res => {
                  if (res.confirm) {
                    wx.setStorageSync('token', '')
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
                success: res => {
                  if (res.confirm) {
                    reject()
                  }
                }
              })
            }
            wx.hideLoading()
          }
        }
      })
    })
  },
  get(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://cy.nulizhe.com${url}`,
        data: data == undefined ? {} : data,
        success: res => {
          if (res.data.code == 1) {
            if (res.data.data) {
              resolve(res.data.data)
            } else {
              resolve()
            }
          } else {
            if (res.data.message.indexOf('重新登录') != -1) {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
                success: res => {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '错误提示',
                content: res.data.message,
                success: res => {
                  if (res.confirm) {
                    reject()
                  }
                }
              })
            }
            wx.hideLoading()
          }
        }
      })
    })
  },
})