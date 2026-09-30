export const API_BASE_DOMAIN = import.meta.env.VITE_API_BASE_URL ?? ''
export const API_BASE_PATH = '/api/v1'

/** Method Type */
export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

/** 도메인별 API 엔드포인트 (예: Example: { List: `${API_BASE_PATH}/examples` }) */
export const API = {}
