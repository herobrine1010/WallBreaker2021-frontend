
const zoneMap={56:'四平',57:'嘉定',58:'彰武',60:'沪西',61:'沪北',59:'铁岭',63:'线上',62:'不限地点'}

const parseDetail=function(item){
  // let {id,name,content,category,location,contactList}=item

  let priceData={}
  if(item.price!=undefined&&item.price!=null){
    let priceList=String(item.price).split('.')
    priceData.price_integer=priceList[0]
    if(priceList.length>1){
      priceData.price_fractional='.'+priceList[1]
    }
  }
  
  if(item.allPicUrl){
    console.log(item.allPicUrl)
    item.allPicUrl=item.allPicUrl.split(',')
  }

  return {
    // id,name,content,category,
    ...item,
    ...priceData,
    zone:zoneMap[item.location]
  }
}

module.exports={parseDetail}