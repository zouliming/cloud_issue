import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next) => {

  // continue to next interceptor
  next((response) => {
    // modify response

  });
});

const API_URL = '/api?s=index'
export default {
  get(url, success) {
    Vue.http.get(API_URL + url).then((response) => {
      if (response.data.status == -1) {
        if (location.pathname != '/login') {
          location.href = '/login'
        }
      } else {
        // success callback
        success(response.data)
      }
    }, (response) => {
      // error callback
    });
  },
  post(url, param, success) {
    Vue.http.post(API_URL + url, param).then((response) => {
      if (response.data.status == -1) {
        if (location.pathname != '/login') {
          location.href = '/login'
        }
      } else {
        // success callback
        success(response.data)
      }
    }, (response) => {
      // error callback
    });
  }
}
