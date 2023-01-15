class SingleTon {
  constructor (fn) {
    let singleInstance;
    function singleConstructor(...args){
      // 第一次实例化
      if(!singleInstance){
        singleInstance = new fn(...args);
      }
      // 多次实例化直接返回
      return singleInstance;
    }

    singleConstructor.prototype = Object.create(fn.prototype);
    return singleConstructor;
  }
}

class kiwiNotificationCenter {
  constructor (id, notiDic) {
    this.id = id
    this.notiDic = notiDic
  }

  registerNotification(notiName, callback) {
    this.notiDic[notiName] = callback
  }

  postNotificationWithName(notiName) {
    let callback = this.notiDic[notiName]
    if (callback != null) {
      callback()
    } else {
      console.log(notiName + ' not found.')
    }
  }

  removeNotificationWithName(notiName) {

  }
}
const notificationCenter = new SingleTon(kiwiNotificationCenter)
const kiwiDefaultCenter = new notificationCenter('defaultCenter', {})

export const defaultCenter = kiwiDefaultCenter;