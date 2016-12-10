import axios from 'axios'
// import { Loading } from 'element-ui'

// let loadingInstance = ''
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // loadingInstance = Loading.service()
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // loadingInstance.close()
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const LOGIN_URL = '/static/test.json'

export default {
  login (data) {
    return axios({
      method: 'get',
      url: LOGIN_URL,
      data: data
    })
  }
}
