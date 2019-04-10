Page({
  data: {
    answersHidden: true,
  },
  //切换答案显示状态
  toggleAnswers:function(){
    if(this.data.answersHidden){
      this.setData({
        answersHidden:false
      })
    }else{
      this.setData({
        answersHidden: true
      })
    }
  }
})