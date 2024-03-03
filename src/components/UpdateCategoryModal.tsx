import { Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategory from '~/hooks/apis/useCategory'
import { modalStyle } from '~/utils'

const UpdateCategoryModal = ({ categoryId, categoryName }: { categoryId: string; categoryName: string }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [newCategory, setNewCategory] = useState(categoryName)
  const { updateCategory } = useCategory()
  const navigate = useNavigate()
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
            {categoryName}
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
              disabled={categoryName === newCategory}
              variant='outlined'
              onClick={async () => {
                await updateCategory(categoryId, 'aaa')
                handleClose()
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

export default UpdateCategoryModal
