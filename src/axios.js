import Axios from 'axios'

const baseURL = process.env.VUE_APP_API_LOCATION
export default Axios.create({
  baseURL
})

