import axios from './../../axios/index.js'
const TOKEN = process.env.VUE_APP_API_TOKEN

export default {
  init () {
    axios.interceptors.request.use(
      (config) => {

        const token = TOKEN
        if (token) {
          config.headers['Authorization'] = `Bearer ${ token }`
        }
        return config
      },

      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
