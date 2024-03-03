import { useCallback } from 'react'
import useApi from './useApi'

const useComment = () => {
  const callApi = useApi()
  const rootEndpoint = '/comment'

  const postComment = useCallback(
    async (orchidId: string, comment: string) => {
      const endpoint = `${rootEndpoint}/${orchidId}`
      try {
        await callApi(
          'post',
          endpoint,
          {},
          {},
          {
            comment: comment
          }
        )
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { postComment }
}

export default useComment
