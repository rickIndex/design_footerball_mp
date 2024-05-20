import request from '../utils/request'
export default {
  cdkeyExchange(data) {
    return request.post('/cdkey/exchange', data)
  }
}