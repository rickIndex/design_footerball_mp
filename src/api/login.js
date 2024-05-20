import request from '../utils/request'

export default {
  //登录接口
  login(data) {
    return request.post('/login', data)
  }
}