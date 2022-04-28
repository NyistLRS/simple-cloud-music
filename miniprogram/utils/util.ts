export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
/**
 * 
 * @param s 传入的歌曲秒数
 */
export const  formatSongTime = function(s:number):any {
  let t;
  if(s > -1){
      let hour = Math.floor(s/3600)
      let min = Math.floor(s/60) % 60
      let sec = s % 60
      if(hour < 10) {
          t = '0'+ hour + ":"
      } 
      else {
          t = hour + ":"
      }
      if(hour==0){
          t=""
      }
      if(min < 10){t += "0"}
      t += min + ":"
      if(sec < 10){t += "0"}
      t += sec.toFixed(0)
  }
  return t
}