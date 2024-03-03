import { Delete } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategory from '~/hooks/apis/useCategory'
import { modalStyle } from '~/utils'

const DeleteCategoryModal = ({ categoryId, categoryName }: { categoryId: string; categoryName: string }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { deleteCategory } = useCategory()
  const navigate = useNavigate()
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Delete color='error' />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            Are you sure you want to delete '{categoryName}'
          </Typography>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button
              color='error'
              variant='outlined'
              onClick={async () => {
                await deleteCategory(categoryId)
                handleClose()
                navigate(0)
              }}
            >
              Yes
            </Button>
            <Button variant='contained' onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default DeleteCategoryModal
