export const createRandomNumber = (max) => Math.floor(Math.random() * max);

export const prefixHex = (color) => {
  if (!color) return
  return `#${color}`
}

export const moneyFormat = (value) => { // 金额 格式化 
  if (!value && value !== 0) return '-';
  var intPart = Number(value) | 0; //获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

  var floatPart = ".00"; //预定义小数部分
  var value2Array = value.toString().split(".");

  //=2表示数据有小数位
  if (value2Array.length == 2) {
      floatPart = value2Array[1].toString(); //拿到小数部分

      if (floatPart.length == 1) { //补0,实际上用不着
          return intPartFormat + "." + floatPart + '0';
      } else {
          return intPartFormat + "." + floatPart;
      }
  } else {
      return intPartFormat;
  }
}

export const getIntroduce = (item,content, str) => {
  if (content === 'desc') {
    return item.introduce ? item.introduce.replace(/;\|;/g, '<br/>') : str
  } else {
    return item.content ? item.content.replace(/;\|;/g, '<br/>') : str
  }
}
