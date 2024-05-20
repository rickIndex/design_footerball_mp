import request from '../utils/request'

export default {
  //登录接口
  getFileCount() {
    return request.get('/getFileCount')
  }
}