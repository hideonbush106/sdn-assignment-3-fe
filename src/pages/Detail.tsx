/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CommentCard from '~/components/CommentCard'
import Loading from '~/components/Loading'
import useComment from '~/hooks/apis/useComment'
import useOrchid from '~/hooks/apis/useOrchid'
import { IComment, IOrchidDetail } from '~/interfaces'
import { notifyError } from '~/utils/toastify'

const Detail = () => {
  const location = useLocation()
  const { getOrchidDetail } = useOrchid()
  const { postComment } = useComment()
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const slug = location.pathname.slice(8)
  const [orchid, setOrchid] = useState<IOrchidDetail>({
    _id: '',
    category: {
      _id: '',
      name: ''
    },
    comments: [
      {
        _id: '',
        author: {
          _id: '',
          username: ''
        },
        comment: '',
        createdAt: '',
        updatedAt: ''
      }
    ],
    image: '',
    isNatural: false,
    name: '',
    origin: '',
    slug: ''
  })
  const getData = async () => {
    try {
      const data = await getOrchidDetail(slug)
      setOrchid(data)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  const postData = async (orchidId: string, comment: string) => {
    try {
      await postComment(orchidId, comment)
      getData()
      setComment('')
    } catch (error) {
      notifyError('You cannot post comment')
    }
  }

  useEffect(() => {
    getData()
    return () => {}
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <Box
          sx={{
            width: '30%',
            p: 5,
            objectFit: 'cover'
          }}
        >
          <img src={orchid.image} />
        </Box>
        <Box
          sx={{
            width: '70%',
            p: 5,
            objectFit: 'cover'
          }}
        >
          <Typography
            sx={{
              mb: 4
            }}
            variant='h4'
            fontWeight={700}
          >
            {orchid.name}
          </Typography>
          <Typography
            sx={{
              my: 2
            }}
            variant='body1'
          >
            Xuất xứ: {orchid.origin}
          </Typography>
          <Typography
            sx={{
              my: 2
            }}
            variant='body1'
          >
            Thể loại: {orchid.category.name}
          </Typography>
          <Typography
            sx={{
              my: 2
            }}
            variant='body1'
          >
            {orchid.isNatural ? 'Hoa tự nhiên' : ''}
          </Typography>
          <Box>
            <Typography variant='h5'>Comments</Typography>
            {orchid.comments.map((value: IComment) => (
              <CommentCard
                key={value._id}
                username={value.author.username}
                updatedAt={value.updatedAt}
                comment={value.comment}
              />
            ))}
            <TextField
              value={comment}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setComment(event.target.value)
              }}
              fullWidth
              label='Your comment'
              multiline
              maxRows={4}
              rows={4}
            />
            <Button size='large' variant='outlined' sx={{ my: 2 }} onClick={() => postData(orchid._id, comment)}>
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Detail
