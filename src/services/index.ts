import axios from "axios";

const api = axios.create({
  baseURL: 'http://api.openweathermap.org',
  params: {
    appid:"25893c51f5e9107e50c455d5951bafcf"
  }
})

export {api}