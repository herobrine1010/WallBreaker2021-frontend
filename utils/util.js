const app = getApp();
// 接受“2021-06-06 19:20:20”格式的字符串，兼容ios，返回日期字符串
// 也能接受日期对象
const formatTime = dateStr => {
  let date;
  if (dateStr instanceof Date) {
    date = dateStr;
  } else {
    date = new Date(dateStr.replace(/-/g, "/"));
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[hour, minute, second].map(formatNumber).join(":")}`;
};

// 只显示年月日
const formatTimeOnDay = dateStr => {
  let date;
  if (dateStr instanceof Date) {
    date = dateStr;
  } else {
    date = new Date(dateStr.replace(/-/g, "/"));
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

const getNotice = param => {
  wx.request({
    url: app.globalData.url + "/user/redPointRelated",
    method: "GET",
    header: { cookie: app.globalData.token },
    success: function (res) {
      if (res.statusCode == 200) {
        if (res.data.data.jirenMsgExist) {
          wx.showTabBarRedDot({ index: 3 });
        } else {
          wx.hideTabBarRedDot({ index: 3 });
        }
        return res.data.data;
      }
    }
  });
};

function getDateDiff(dateTime) {
  const dateTimeStamp = new Date(dateTime.replace(/-/g, "/")).getTime();

  let result = "";
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const halfamonth = day * 15;
  const month = day * 30;
  const year = day * 365;
  const now = new Date().getTime();
  let diffValue = now - dateTimeStamp;

  if (diffValue > 0) {
    const monthEnd = diffValue / month;
    const weekEnd = diffValue / (7 * day);
    const dayEnd = diffValue / day;
    const hourEnd = diffValue / hour;
    const minEnd = diffValue / minute;
    const yearEnd = diffValue / year;
    if (yearEnd >= 1) {
      result = dateTime;
    } else if (monthEnd >= 1) {
      result = String(parseInt(monthEnd)) + "月前";
      // result = dateTime;
    } else if (weekEnd >= 1) {
      result = String(parseInt(weekEnd)) + "周前";
    } else if (dayEnd >= 1) {
      result = String(parseInt(dayEnd)) + "天前";
    } else if (hourEnd >= 1) {
      result = String(parseInt(hourEnd)) + "小时前";
    } else if (minEnd >= 1) {
      result = String(parseInt(minEnd)) + "分钟前";
    } else {
      result = "刚刚";
    }
  } else if (diffValue < 0) {
    diffValue = -diffValue;
    const monthEnd = diffValue / month;
    const weekEnd = diffValue / (7 * day);
    const dayEnd = diffValue / day;
    const hourEnd = diffValue / hour;
    const minEnd = diffValue / minute;
    const yearEnd = diffValue / year;
    if (yearEnd >= 1) {
      result = dateTime;
    } else if (monthEnd >= 1) {
      result = String(parseInt(monthEnd)) + "月后";
      // result = dateTime;
    } else if (weekEnd >= 1) {
      result = String(parseInt(weekEnd)) + "周后";
    } else if (dayEnd >= 1) {
      result = String(parseInt(dayEnd)) + "天后";
    } else if (hourEnd >= 1) {
      result = String(parseInt(hourEnd)) + "小时后";
    } else if (minEnd >= 1) {
      result = String(parseInt(minEnd)) + "分钟后";
    } else {
      result = "不久后";
    }
  }

  // console.log(result)
  return result;
}

module.exports = {
  formatTime: formatTime,
  formatTimeOnDay: formatTimeOnDay,
  getDateDiff: getDateDiff,
  getNotice: getNotice
};
