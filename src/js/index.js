window.onload = function () {
  var pageIndex = 1; // pageindex不同的数字显示不同的内容
  if (pageIndex) {
    var data = {
      index: pageIndex,
      imgSrc: { srcs: ["images/college/courseBanner_02.jpg", "images/apply/banner_02.jpg"] },
      one: {
        name: ["课程辅导", "背景提升"],
        t1: [{ h1: "GMAT 740强化班", h2: "一听就懂，一学就会", icon: "gmatIcon", bk: "bk-top-blue" }, { h1: "2017 创业创新全融入实训营", h2: "波士顿大学官方认证", icon: "gmatIcon2", bk: "bk-top-blue2" }],
        t2: [{ h1: "VIP 一对一辅导", h2: "个性化辅导，高效刷分", icon: "vipIcon", bk: "bk-top-red" }, { h1: "2017 美国顶级名企实习项目", h2: "500强名企入场劵", icon: "vipIcon2", bk: "bk-top-red2" }],
        t3: [{ h1: "OG 讲解", h2: "GMAT考试第一课", bk: "bk-bottom-1" }, { h1: "启明星计划", h2: "长期申请规划方案", bk: "bk-bottom-1-1" }],
        t4: [{ h1: "GMAT 词汇", h2: "帮你清扫词汇障碍", bk: "bk-bottom-2" }, { h1: "商科申请方案", h2: "精英顾问决胜2017", bk: "bk-bottom-2-2" }],
        t5: [{ h1: "技巧提升", h2: "帮你轻松提升技巧", bk: "bk-bottom-3" }, { h1: "H-1B直通车", h2: "海外就业拒绝“裸归”", bk: "bk-bottom-3-3" }],
      },
      three: {
        t1: [{ imgSrc: "images/college/yxIcon3.png", p1: "TimeMachine时光机 温故而知新", p2: "课堂之外，提供课程回放，不限制学习次数" }, { imgSrc: "images/apply/yxIcon3.png", p1: "权威实时选校分析系统", p2: "课堂之外，提供课程回放，不限制学习次数" }],
        t2: [{ imgSrc: "images/college/yxIcon4.png", p1: "专属学习群组服务", p2: "课程班主任，学习资料分享，答疑辅导" }, { imgSrc: "images/apply/yxIcon4.png", p1: "天道头脑风暴法", p2: "课程班主任，学习资料分享，答疑辅导" }],
        t3: [{ imgSrc: "images/college/yxIcon5.png", p1: "支持移动支付，闪电开课", p2: "支持微信，支付宝移动支付，扫码支付，二维码转账" }, { imgSrc: "images/apply/yxIcon5.png", p1: "一流名校精英团队", p2: "支持微信，支付宝移动支付，扫码支付，二维码转账" }],
        t4: [{ imgSrc: "", p1: "", p2: "" }, { imgSrc: "images/apply/yxIcon6.png", p1: "2Seminar服务体系", p2: "支持微信，支付宝移动支付，扫码支付，二维码转账" }],
      }
    }
    var html = template('tpl', data);
    document.getElementById('content2').innerHTML = html;
  }
}
