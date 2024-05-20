import axios from 'axios'

const service = axios.create({
  baseURL: 'http://8.138.17.244:9000/',
  timeout: 10000
})

//获取token
const token = localStorage.getItem('user-token');

// 请求拦截器
axios.interceptors.request.use(config => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log(response);
    const { code, message, data } = response.data;
    // 根据code的值决定下面的操作
    if (code === 200) {
      return data;
    }
  },
  error => {
    if (error.response) {
      return Promise.resolve(error.response);  // 将错误响应的数据视为成功响应
    } else {
      return Promise.reject('网络错误')
    }
  }
);


const request = {
  get: (url, params) => service.get(url, params),
  post: (url, data) => service.post(url, data),
};

export default request;

