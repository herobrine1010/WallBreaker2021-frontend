// miniprogram/pages/jishi/detail-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBackground:'',
    postList : [{
        title:'2021同济大学迎新-学生寝室空调租赁指南',
        isPostingCollected:1,
        name : '同济空调租赁中心',
        theme : '空调租赁',
        date : '2021年8月24日',
        content : '<p style="text-align:center;"></p><p style="text-align:center;">2021同济大学迎新<br/>之<br/>学生寝室空调租赁指南</p><p style="text-align:center;">空调办理流程<br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/E7CiaJ9pnL2DKd1DSDM3pHMzmSiaj9rZBYYFryN4zfQd6LNn352tKF9yyFsDWAUgJl9ezOFdNw1PpEUW4Jlz3Osw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/>01<img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/SIXyQkMYHNqcsVfXic5X3LKibAe1qFdclFqMcD7lVQZz2A07RxxslxibFxnpCA62Dh1ojVkvyngCCFHmEzdIApT5g/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/>关注同济空调服务中心公众号：“Tongji-gree<br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/t8rfPSpdoKOkXoqTXywoibXBHibNJV3CUqHuMbibicricWynfzd3aYfFXRpCTGicGTVWuWveS3ia0uewkPdtT61BuYX1g/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/E7CiaJ9pnL2DKd1DSDM3pHMzmSiaj9rZBYYFryN4zfQd6LNn352tKF9yyFsDWAUgJl9ezOFdNw1PpEUW4Jlz3Osw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/>02<img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/SIXyQkMYHNqcsVfXic5X3LKibAe1qFdclFqMcD7lVQZz2A07RxxslxibFxnpCA62Dh1ojVkvyngCCFHmEzdIApT5g/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/>选择“校园空调”-→“空调租赁”<br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/t8rfPSpdoKOkXoqTXywoibXBHibNJV3CUq1uzFFsdJ2CZHntGfIGibX1kldwtfPL8vPRbBXpHsaKVjAIRsQ3ZialWw/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/E7CiaJ9pnL2DKd1DSDM3pHMzmSiaj9rZBYYFryN4zfQd6LNn352tKF9yyFsDWAUgJl9ezOFdNw1PpEUW4Jlz3Osw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/>03<img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/SIXyQkMYHNqcsVfXic5X3LKibAe1qFdclFqMcD7lVQZz2A07RxxslxibFxnpCA62Dh1ojVkvyngCCFHmEzdIApT5g/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/>寝室成员派一代表，填写表内相关信息后提交<br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/t8rfPSpdoKOkXoqTXywoibXBHibNJV3CUqrh3Q75OMx6TAmpR3gJJpPJ206Jlg3Mq1a2oBU06iaxq31rAeYiboUNdA/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/E7CiaJ9pnL2DKd1DSDM3pHMzmSiaj9rZBYYFryN4zfQd6LNn352tKF9yyFsDWAUgJl9ezOFdNw1PpEUW4Jlz3Osw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/>04<img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/SIXyQkMYHNqcsVfXic5X3LKibAe1qFdclFqMcD7lVQZz2A07RxxslxibFxnpCA62Dh1ojVkvyngCCFHmEzdIApT5g/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/>提交成功后记住订单号（可截屏）前往<br/>→同济大学空调服务中心办理租赁业务及交费（派代表即可）<br/><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/t8rfPSpdoKOkXoqTXywoibXBHibNJV3CUqRicVaJZhsXhtI6AojpMBXQL8XeSVFFbFicPuOAw0lhwuZ2ic5784D5ePA/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/><br/><blockquote><p>本周同济大学各校区进入错时错锋返校开学阶段。</p><p> </p><p>望同学们安排好寝室后及时前往空调服务中心办理空调租赁开通业务，以免造成人员聚集。</p></blockquote><p style="text-align:center;">同济大学空调服务中心地下：</p><p style="text-align:center;">四平路校区位置：西南二号楼（8:30~17:00）</p><p style="text-align:center;">嘉定校区位置：友园二号楼（9:00~17:00）</p><p style="text-align:center;">注：8月28日（周六）、8月29日（周日）正常办公</p>'
    },{
      title:'招聘 | 2021届上海高校毕业生就业工作系列活动求职分享专场',
      isPostingCollected:0,
      name : '同济就业',
      theme : '求职经验分享',
      date : '2020年12月26日',
      content : '<p style="text-align:center;"><img alt="图片" src="https://i.loli.net/2021/09/14/rLxWTHt3ljfqgca.gif"/></p><p style="text-align:center;"><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/UWAPUIIbNgMogXoiaoNMNicOyDrw6J6QPjgTSmuzyUEYLWQ2G2NNb62AvvASsiaNpaTJuibYU7jicvLOkm6wxF0kWzw/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/></p><blockquote><p>“求职是否找不到技巧？如何把握机遇？怎样明确就业目标？如何最大化发挥自己的特点？找工作经常焦头烂额？…”</p><p> </p><p>求职过程如何斩获offer？听身边的同学们说说！</p></blockquote><p style="text-align:center;">四千多名同学在线观看</p><p style="text-align:center;">错过直播的同学不要遗憾</p><p style="text-align:center;">点击下方的视频链接</p><p style="text-align:center;">一起来学习吧！</p><p style="text-align:center;"><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/34HvoGGWECjRYj0ZHewARLBIia1lNicGyCkHLic4aZIDmV3tTh7wQhq98ZpLRqjzH2PCBkyAIr1UYINlkibeC6rHicw/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/></p><p style="text-align:center;">直播招聘岗位</p><p style="text-align:center;"><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/34HvoGGWECjRYj0ZHewARLBIia1lNicGyCLjAYJQVmz5iaEVsd0IoY5EQPeR7nXNQakTdU0OSxXe7GRFZ5grVc9RQ/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/></p><p style="text-align:center;">简历投递</p><p style="text-align:center;"><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_jpg/34HvoGGWECjRYj0ZHewARLBIia1lNicGyCKXhrGsld7hEGicCLMFG814ATtWzwbevPws9F4L9Hr6rjgiaeUGBbnFCg/640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/></p><p style="text-align:center;">求职技巧分享</p><p style="text-align:center;">李双菲</p><blockquote><p>1.祖国终将选择那些选择祖国的人</p><p>2.把个人发展和祖国的需要紧密联系</p><p><br/></p></blockquote>'},{
      title:'礼敬中华•名家讲坛 | 评弹艺术与红色传承',
      isPostingCollected:1,
      name : '同济大学图书馆',
      theme : '传统文化',
      date : '2021年7月2日',
      content:'<p style="text-align:center;">源于宋盛于清，</p><p style="text-align:center;">温柔的吴侬软语，</p><p style="text-align:center;">清丽的琵琶三弦，</p><p style="text-align:center;">在今天，评弹艺术与红色传承</p><p style="text-align:center;">将如何用古语说新事？</p><p style="text-align:center;"><img alt="图片" src="https://mmbiz.qpic.cn/mmbiz_png/gVs0G2onMjvkP2PtpauicOlF1mzobpdJ9iccYicrR1f65ZMO9CPeNWxiaib4MI9LgqxUibeBV4kfAexRehuxjUgPLCEA/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1"/></p><quote><p>此次讲座邀请到国家一级演员、中国曲艺最高奖“牡丹表演奖”获得者、上海市非物质文化遗产传承人周红老师，带领大家了解评弹艺术，感受评弹之美。讲述当代社会下，评弹艺术与红色传承的故事。</p><p><br/></p></quote>',
    }],

    title:'测试标题|小红帽招新',
    isPostingCollected:1,
    name : '恒兴号名称',
    theme : '主题',
    date : '发帖日期：2020年12月19日',
    content : '<p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p><p data-we-empty-p="" style="padding-left:2em;">可以任意修改<span style = "color:#c24f4a">文件</span>格式吗</p><img src="https://i.loli.net/2021/09/04/a5zkAKXo61dYSZB.jpg" style="width:200px;height:200px"><p data-we-empty-p="" style="padding-left:4em;">每行可以<font color="#8baa4a">兼容</font>不同的<font color="#f9963b">样式</font>吗？</p><p><font size="6">可以兼容</font>不同的字体吗？</p><p><span style="background-color: rgb(194, 79, 74);">兼容</span>不同的<span style="background-color: rgb(139, 170, 74);">背景</span>色？</p><p>在<u>小程序</u>里表<i>现如</i>何呢</p>',
    hasLink : true,
    navTitle : '关于疫情的调查问卷',
    navImage : '',
    navUrl : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    let {
      title,
      isPostingCollected,
      name ,
      theme ,
      date ,
      content 
    } = this.data.postList[index];
    this.setData({
      title,
      isPostingCollected,
      name ,
      theme ,
      date ,
      content,
      hasLink : false 
    });
    console.log(options.index);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 页面拖动事件，改变顶部导航栏的背景：
  onPageScroll: function(e){
    if(e.scrollTop>10){
      if(this.data.navBackground == ''){
        this.setData({
          navBackground:'#90B4FB'
        })
      }
    }
    else if(e.scrollTop<10){
      if(this.data.navBackground){
        this.setData({
          navBackground:''
        })
      }
    }
  },
  collect:function(){
    this.setData({
      isPostingCollected : 1
    });
    wx.showToast({
      title: '收藏成功',
      icon:'success'
    })
  },
  cancelCollect:function(){
    this.setData({
      isPostingCollected : 0
    });
    wx.showToast({
      title: '取消收藏',
      icon:'success'
    })
  },
  attachNavgitor:function(){
    wx.navigateTo({
      url: './link',
    })
  },
  addAnimation(){
    this.setData({
      animationClass : 'ani-shake-right'
    });
    setTimeout(() => {
      this.setData({
        animationClass : ''
      });
    }, 900);
  }


})