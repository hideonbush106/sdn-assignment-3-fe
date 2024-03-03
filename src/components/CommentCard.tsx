import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import moment from 'moment'
export interface ICommentCard {
  username: string
  comment: string
  updatedAt: string
}

const CommentCard = ({ username, comment, updatedAt }: ICommentCard) => {
  return (
    <Card
      sx={{
        my: 3
      }}
    >
      <CardContent
        sx={{
          display: 'flex'
        }}
      >
        <Avatar src='https://i.pravatar.cc/' sx={{ width: 56, height: 56 }} />
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mt: 1.5,
            ml: 1,
            flexDirection: 'column',
            alignItems: 'start'
          }}
        >
          <Typography variant='h6' fontWeight={700}>
            {username}
          </Typography>
          <Typography variant='h6' fontSize={17}>
            {comment}
          </Typography>
          <Typography variant='body2' color='grey'>
            Posted at {moment(updatedAt).format('DD-MM-yyyy HH:mm')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CommentCard
