import request from '../utils/request'

export default {
  //得到场馆信息列表
  getUserCount() {
    return request.get('/user/getUserCount')
  }
}