/* eslint-disable prettier/prettier */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const remote = axios.create({
  baseURL: '',
  timeout: 5000
})

remote.interceptors.request.use((confirm) => {
  console.log(confirm)
  return confirm
})
remote.interceptors.response.use(
  (res) => {
    console.log(res)
    
    return res
  },
  (error) => {
    ResponseProcessing(error)
  }
)
const ResponseProcessing = (error) => {
  if (error.response) {
    switch (error.response.state) {
      case 401:
        ElMessage.warning('资源没有访问权限！')
        break
      case 404:
        ElMessage.warning('接口不存在，请检查接口地址是否正确！')
        break
      case 500:
        ElMessage.warning('内部服务器错误，请联系系统管理员！')
        break
      default:
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
  } else {
    ElMessage.error('遇到跨域错误，请设置代理或者修改后端允许跨域访问！')
  }
}
