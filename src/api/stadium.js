import request from '../utils/request'

export default {
  //得到场馆信息列表
  getStadiumList() {
    return request.get('/stadium/list')
  }
}