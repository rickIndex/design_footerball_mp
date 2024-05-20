import request from '../utils/request'

export default {
  getDayList() {
    return request.get('/order/getDayList')
  },
  getWeekList() {
    return request.get('/order/getWeekList')
  },
  getMonthList() {
    return request.get('/order/getMonthList')
  },
  getYearList() {
    return request.get('/order/getYearList')
  },
  getAllList() {
    return request.get('/order/getAllList')
  }
}