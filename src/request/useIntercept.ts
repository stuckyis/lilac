import { type AxiosError, type AxiosResponse, HttpStatusCode, isAxiosError } from 'axios'
import { useCallback, useLayoutEffect } from 'react'
import axiosInstance from './axios'
import { API } from './const'

interface ServerResponse<T> {
  body: T
  code: string
  message?: string
}

// const WHITELIST_CODE = 403
// const LOG_OUT_CODE = [WHITELIST_CODE]

const useIntercept = () => {
  // const logout = useCallback(() => {
  //     setAuthCheck(false) // 로그아웃 상태 변경
  //     useAlert({
  //         message: '토큰 만료로 인해 로그인 화면으로 이동합니다.',
  //         closeButton: '확인',
  //         onClose: () => {
  //             useSigninApi.logout().finally(() => {
  //                 // 페이지 리로드로 bfcache 이슈 방지 (로그인 여부 확인용)
  //                 window.location.href = Menus.Signin
  //             })
  //         },
  //     })
  // }, [])

  const successHandler = useCallback(async (response: AxiosResponse<ServerResponse<unknown>>) => {
    const { code, message } = response.data

    if (response.data && typeof response.data === 'object' && Number(code) !== HttpStatusCode.Ok) {
      console.log('successHandler code :: ', code, ' // message :: ', message)
      // useAlert({
      //     message,
      //     onClose: () => {
      //         if (LOG_OUT_CODE.includes(Number(code))) {
      //             setAuthCheck(false) // 로그아웃 상태 변경
      //             useSigninApi.logout().finally(() => {
      //                 // 페이지 리로드로 bfcache 이슈 방지
      //                 window.location.href = Menus.Signin
      //             })
      //         }
      //     },
      // })
    }

    return response
  }, [])

  const errorHandler = useCallback(async (error: AxiosError<Error>) => {
    const { status, config } = error.response as AxiosResponse
    if (isAxiosError(error)) {
      // 에러 로그 생성 및 저장
      // if (config?.skipErrorHandler) {
      //     return Promise.reject(error)
      // }

      if (status === HttpStatusCode.Unauthorized) {
        if (config?.url !== API.Auth.Refresh) {
          console.log('로그아웃')
          // return useSigninApi
          //     .refresh()
          //     .then(() =>
          //         axiosInstance(
          //             error.config as InternalAxiosRequestConfig,
          //         ),
          //     )
          //     .catch(() => logout())
        }
      } else {
        const errorMsg = '정상 처리되지 않았습니다.\n관리자에게 문의해 주세요.'
        console.log('errorMsg :: ', errorMsg)
        // useAlert({
        //     message: errorMsg,
        //     closeButton: '확인',
        //     onClose: logout,
        // })
      }
    }
    return Promise.reject(error)
  }, [])

  useLayoutEffect(() => {
    const resIntercept = axiosInstance.interceptors.response.use(
      response => successHandler(response),
      error => errorHandler(error),
    )
    return () => {
      axiosInstance.interceptors.response.eject(resIntercept)
    }
  }, [successHandler, errorHandler])
}

export default useIntercept
