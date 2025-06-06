import axios from 'axios'

const instance=axios.create({
  baseURL: 'https://localhost:5001/api/',
  timeout: 1000,
});

instance.interceptors.request.use((config)=>{
    // Do something before request is sent
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
    return config;
})
export default instance