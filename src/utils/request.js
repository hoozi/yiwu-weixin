import axios from 'axios';
import AlertModule from 'vux/src/plugins/alert'
//import { getToken } from '@/utils/token';
//import { Notification } from 'element-ui';
//import store from '@/store';
//import router from '@/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误），请重新登录。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  428: '发送请求时，缺少先决条件。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const service = axios.create({
  baseURL: '/',
  timeout: 20000,
  withCredentials: true
});

// 请求前认证token
service.interceptors.request.use( request => {
  if (request.method === 'POST' || request.method === 'PUT') {
    if (!(request.data instanceof FormData)) {
      request.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...request.headers,
      };
      request.data = JSON.stringify(request.data);
    } else {
      // newOptions.body is FormData
      request.headers = {
        Accept: 'application/json',
        ...request.headers,
      };
    }
  }
  
  //request.headers['Authorization'] = getToken() ? `Bearer ${getToken()}` : 'Basic dGVzdDp0ZXN0';
  
  return request;
}, error => {
  Promise.reject(error);
});

// 返回时候的拦截处理
service.interceptors.response.use( response => response.data, response => {
  const { status } = response.response;
  /* Notification({
    title: `请求错误: ${status}`,
    message: codeMessage[status],
    type: 'error'
  }); */
  AlertModule.show({
    title: `请求错误: ${status}`,
    content: codeMessage[status],
  });
  throw response.response;
});

export default function request(url, options) {
  return service(url, options)
  .then(response => {
    return response;
  })
  .catch(e => {
    if (e.status === 401) {
      //store.dispatch('user/logout');
      return;
    } else if(e.status === 500 ) {
      //router.push('/500');
      return;
    }
  });
}
