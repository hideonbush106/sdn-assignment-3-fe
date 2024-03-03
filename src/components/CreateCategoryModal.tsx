import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategory from '~/hooks/apis/useCategory'
import { modalStyle } from '~/utils'

const CreateCategoryModal = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [newCategory, setNewCategory] = useState('')
  const { createCategory } = useCategory()
  const navigate = useNavigate()
  return (
    <>
      <Button onClick={handleOpen} sx={{ mb: 2 }} variant='outlined'>
        Create new category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            Create new category
          </Typography>
          <TextField
            sx={{ ml: 7 }}
            value={newCategory}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewCategory(event.target.value)
            }}
          />
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button
              color='error'
              variant='outlined'
              disabled={!newCategory}
              onClick={async () => {
                await createCategory(newCategory)
                navigate(0)
              }}
            >
              Create
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

export default CreateCategoryModal
