// 接受“2021-06-06 19:20:20”格式的字符串，兼容ios，返回日期字符串
// 也能接受日期对象
const formatTime = dateStr => {
  let date;
  if(dateStr instanceof Date){
    date = dateStr;
  }else{
    date = new Date(dateStr.replace(/-/g,'/'));
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getDateDiff(dateTime){
  let dateTimeStamp = new Date(dateTime.replace(/-/g, '/')).getTime();

  let result = '';
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let year = day * 365;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;

  if(diffValue>0){
    let monthEnd = diffValue / month;
    let weekEnd = diffValue / (7 * day);
    let dayEnd = diffValue / day;
    let hourEnd = diffValue / hour;
    let minEnd = diffValue / minute;
    let yearEnd = diffValue / year;
    if (yearEnd >= 1) {
      result = dateTime;
    } else if (monthEnd >= 1) {
      result = "" + parseInt(monthEnd) + "月前";
      //result = dateTime;
    } else if (weekEnd >= 1) {
      result = "" + parseInt(weekEnd) + "周前";
    } else if (dayEnd >= 1) {
      result = "" + parseInt(dayEnd) + "天前";
    } else if (hourEnd >= 1) {
      result = "" + parseInt(hourEnd) + "小时前";
    } else if (minEnd >= 1) {
      result = "" + parseInt(minEnd) + "分钟前";
    } else {
      result = "刚刚";
    }
  }else if(diffValue<0){
  diffValue=-diffValue;
  let monthEnd = diffValue / month;
  let weekEnd = diffValue / (7 * day);
  let dayEnd = diffValue / day;
  let hourEnd = diffValue / hour;
  let minEnd = diffValue / minute;
  let yearEnd = diffValue / year;
  if (yearEnd >= 1) {
    result = dateTime;
  } else if (monthEnd >= 1) {
    result = "" + parseInt(monthEnd) + "月后";
    //result = dateTime;
  } else if (weekEnd >= 1) {
    result = "" + parseInt(weekEnd) + "周后";
  } else if (dayEnd >= 1) {
    result = "" + parseInt(dayEnd) + "天后";
  } else if (hourEnd >= 1) {
    result = "" + parseInt(hourEnd) + "小时后";
  } else if (minEnd >= 1) {
    result = "" + parseInt(minEnd) + "分钟后";
  } else {
    result = "不久后";
  }
  }
  
  console.log(result)
  return result;
};



module.exports = {
  formatTime:formatTime,
  getDateDiff:getDateDiff
}
