/* eslint-disable react-hooks/exhaustive-deps */
import { Edit } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategory from '~/hooks/apis/useCategory'
import useOrchid from '~/hooks/apis/useOrchid'
import { ICategoryList, IOrchidRequest } from '~/interfaces'
import { modalStyle } from '~/utils'

const UpdateOrchidModal = ({ data, orchidId }: { data: IOrchidRequest; orchidId: string }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setNewOrchid(data)
  }
  const { updateOrchid } = useOrchid()
  const { getAllCategories } = useCategory()
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([])
  const navigate = useNavigate()
  const [newOrchid, setNewOrchid] = useState<IOrchidRequest>(data)

  const getAllCate = async () => {
    try {
      const response = await getAllCategories()
      setCategoryList(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCate()
    return () => {}
  }, [])

  const handleChangeData = async (event: React.ChangeEvent<HTMLInputElement>, isNatural = false) => {
    setNewOrchid((prevState) => {
      return {
        ...prevState,
        [event.target.name]: isNatural ? event.target.checked : event.target.value
      }
    })
  }

  const isValid: boolean =
    Boolean(newOrchid.name === '' || newOrchid.category === '' || newOrchid.image === '' || newOrchid.origin === '') ||
    JSON.stringify(newOrchid) === JSON.stringify(data)

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            Update new orchid
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField value={newOrchid.name} name='name' onChange={handleChangeData} label='Orchid name' />
            <Select
              value={newOrchid.category}
              onChange={(event: SelectChangeEvent<string>) => {
                setNewOrchid((prevState) => {
                  return {
                    ...prevState,
                    category: event.target.value
                  }
                })
              }}
              name='category'
              label='Category'
            >
              {categoryList.map((value: ICategoryList) => (
                <MenuItem key={value._id} value={value._id}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              name='isNatural'
              control={
                <Checkbox defaultChecked={newOrchid.isNatural} onChange={(event) => handleChangeData(event, true)} />
              }
              label='Is natural?'
            />
            <TextField value={newOrchid.origin} name='origin' onChange={handleChangeData} label='Orchid origin' />
            <TextField value={newOrchid.image} name='image' onChange={handleChangeData} label='Orchid image' />
          </Box>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button
              disabled={isValid}
              color='error'
              variant='outlined'
              onClick={async () => {
                await updateOrchid(orchidId, newOrchid)
                navigate(0)
              }}
            >
              Update
            </Button>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateOrchidModal
