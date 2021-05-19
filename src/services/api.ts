import axios from 'axios'
import { APIResponse } from 'shared-types'

const API_ROOT = process.env.REACT_APP_API_ROOT

const axiosInstance = axios.create({
  baseURL: `${API_ROOT}/v1/`,
  timeout: 5000,
})

const Api = {
  async fetch<Entity>(url: string, apiKey: string, params?: any) {
    const API_KEY = `${apiKey}:`
    const result = await axiosInstance.get<APIResponse<Entity>>(url, {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(API_KEY)}`,
      },
    })
    return result.data
  },
}

export default Api
