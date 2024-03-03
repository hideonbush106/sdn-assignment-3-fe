import { useCallback } from 'react'

import { AxiosError, AxiosResponse } from 'axios'
import { notifyError } from '~/utils/toastify'
import { get, patch, post, put, remove } from '~/utils/api'
import useAuth from '~/hooks/useAuth'
const useApi = () => {
  const { idToken } = useAuth()

  const handleError = useCallback(async (error: unknown) => {
    if (error instanceof AxiosError) {
      const message = (error.response?.data as { message: string }).message
      if (message) {
        notifyError(message)
      } else {
        notifyError('Unauthorized')
      }
    }
  }, [])

  const callApi = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete' | 'patch',
      endpoint: string,
      headers: object = {},
      params: object = {},
      body: object = {}
    ) => {
      const headersDefault = {
        accept: 'application/json',
        Authorization: `Bearer ${idToken ?? localStorage.getItem('idToken')}`
      }
      Object.assign(headersDefault, headers)
      let response: AxiosResponse
      try {
        switch (method) {
          case 'get': {
            response = await get(endpoint, params, headersDefault)
            break
          }
          case 'post': {
            response = await post(endpoint, body, params, headersDefault)
            break
          }
          case 'put': {
            response = await put(endpoint, body, params, headersDefault)
            break
          }
          case 'delete': {
            response = await remove(endpoint, body, params, headersDefault)
            break
          }
          case 'patch': {
            response = await patch(endpoint, body, params, headersDefault)
            break
          }
        }
        return response.data
      } catch (error) {
        handleError(error)
      }
    },
    [handleError, idToken]
  )

  return callApi
}

export default useApi
