import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

export interface IOrchidCard {
  image: string
  name: string
  category: string
  slug: string
}

export default function OrchidCard({ image, name, category, slug }: IOrchidCard) {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title='green iguana' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Category: {category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/detail/${slug}`)} size='small'>
          Detail
        </Button>
      </CardActions>
    </Card>
  )
}
