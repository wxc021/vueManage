import axios from 'axios'
import router from '@/router/router'
import store from './store'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(
    config => {
        // if (store.state.token) {
        //     config.headers.Authorization = `token ${store.state.token}`;
        // }
        //console.log(config)
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
        //未登录
    	if (response.data.code === '1004') {
            router.push({
                path: '/login',
                // query: {redirect: router.currentRoute.fullPath}
            })
        }
        return response;
    },
    error => {
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;