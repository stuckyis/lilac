/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from 'axios'
import { API_BASE_DOMAIN, HTTP_METHOD } from './const'

console.log('API_BASE_DOMAIN :: ', API_BASE_DOMAIN)
export const axiosInstance = axios.create({
  baseURL: API_BASE_DOMAIN,
  timeout: 10000,
  withCredentials: true,
})

const makeRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
  const { url = '', method = HTTP_METHOD.GET, ...rest } = request
  console.log('request :: ', request, ' // ', rest)
  return {
    url,
    method,
    responseType: 'json',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Api-Envelope': true,
    },
    ...rest,
  }
}

export const fetchApi = <T = any>(request: AxiosRequestConfig): Promise<T> => axiosInstance(makeRequest(request)).then(response => response.data)

export default axiosInstance
