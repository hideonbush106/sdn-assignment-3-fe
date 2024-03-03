/* eslint-disable react-hooks/exhaustive-deps */
import { Search } from '@mui/icons-material'
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Loading from '~/components/Loading'
import OrchidCard from '~/components/OrchidCard'
import useOrchid from '~/hooks/apis/useOrchid'
import { IOrchid } from '~/interfaces'
import { notifyError } from '~/utils/toastify'

const Public = () => {
  const [orchid, setOrchid] = useState<IOrchid[]>([])
  const { getAllOrchids, searchOrchid } = useOrchid()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const getAllData = async () => {
    try {
      const data = await getAllOrchids()
      setOrchid(data)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  const search = async (search: string) => {
    try {
      const data = await searchOrchid(search)
      setOrchid(data)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllData()
    return () => {}
  }, [])

  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{
                m: 3
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(event.target.value)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                )
              }}
            />
            <Button
              variant='contained'
              onClick={async () => {
                if (!searchQuery) await getAllData()
                else await search(searchQuery)
              }}
            >
              Search
            </Button>
          </Box>
          <Grid
            sx={{
              pt: 4,
              pl: 3
            }}
            container
            spacing={2}
          >
            {orchid &&
              orchid.map((value: IOrchid) => (
                <Grid key={value._id} item xs={3}>
                  <OrchidCard name={value.name} category={value.category.name} image={value.image} slug={value.slug} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default Public
