import { Box, CircularProgress } from '@mui/material'

interface LoadingProps {
  fullViewport?: boolean
}

const Loading = ({ fullViewport = false }: LoadingProps) => {
  const boxStyle = fullViewport
    ? { display: 'flex', height: '100vh', width: '100vw' }
    : { display: 'flex', height: '80vh', width: '85vw' }

  return (
    <Box sx={boxStyle} justifyContent='center' alignItems='center'>
      <CircularProgress size={80} />
    </Box>
  )
}

export default Loading
