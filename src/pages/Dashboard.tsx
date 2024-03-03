/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import useUser from '~/hooks/apis/useUser'
import { ICategoryList, IOrchidDetail, IUserList } from '~/interfaces'
import { notifyError } from '~/utils/toastify'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { Box, Typography } from '@mui/material'
import Loading from '~/components/Loading'
import moment from 'moment'
import useCategory from '~/hooks/apis/useCategory'
import useOrchid from '~/hooks/apis/useOrchid'
import { Check } from '@mui/icons-material'
import DeleteOrchidModal from '~/components/DeleteOrchidModal'
import DeleteCategoryModal from '~/components/DeleteCategoryModal'
import UpdateCategoryModal from '~/components/UpdateCategoryModal'
import CreateCategoryModal from '~/components/CreateCategoryModal'
import CreateOrchidModal from '~/components/CreateOrchidModal'
import UpdateOrchidModal from '~/components/UpdateOrchidModal'
const Dashboard = () => {
  const { getUsers } = useUser()
  const { getAllCategories } = useCategory()
  const { getAllOrchidsAdmin } = useOrchid()
  const [users, setUsers] = useState<IUserList[]>([])
  const [categories, setCategories] = useState<ICategoryList[]>([])
  const [orchids, setOrchids] = useState<IOrchidDetail[]>([])

  const [loading, setLoading] = useState(true)

  const userColumns = useMemo<MRT_ColumnDef<IUserList>[]>(
    () => [
      {
        accessorKey: 'username',
        header: 'Username'
      },
      {
        accessorKey: 'createdAt',
        header: 'Created at',
        accessorFn(originalRow) {
          return moment(originalRow.createdAt).format('DD-MM-YYYY')
        }
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated at',
        accessorFn(originalRow) {
          return moment(originalRow.updatedAt).format('DD-MM-YYYY')
        }
      }
    ],
    []
  )

  const categoryColumns = useMemo<MRT_ColumnDef<ICategoryList>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Category name'
      },
      {
        accessorKey: 'createdAt',
        header: 'Created at',
        accessorFn(originalRow) {
          return moment(originalRow.createdAt).format('DD-MM-YYYY')
        }
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated at',
        accessorFn(originalRow) {
          return moment(originalRow.updatedAt).format('DD-MM-YYYY')
        }
      },
      {
        header: 'Action',
        enableColumnActions: false,
        Cell(props) {
          return (
            <>
              <UpdateCategoryModal categoryId={props.row.original._id} categoryName={props.row.original.name} />
              <DeleteCategoryModal categoryId={props.row.original._id} categoryName={props.row.original.name} />
            </>
          )
        }
      }
    ],
    []
  )

  const orchidColumns = useMemo<MRT_ColumnDef<IOrchidDetail>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'category.name',
        header: 'Category name'
      },
      {
        accessorKey: 'image',
        header: 'Image'
      },
      {
        accessorKey: 'isNatural',
        header: 'Is natural?',
        Cell(props) {
          return props.row.original.isNatural ? <Check /> : null
        }
      },
      {
        accessorKey: 'origin',
        header: 'Origin'
      },
      {
        accessorKey: 'createdAt',
        header: 'Created at',
        accessorFn(originalRow) {
          return moment(originalRow.createdAt).format('DD-MM-YYYY')
        }
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated at',
        accessorFn(originalRow) {
          return moment(originalRow.updatedAt).format('DD-MM-YYYY')
        }
      },
      {
        header: 'Action',
        enableColumnActions: false,
        Cell(props) {
          return (
            <>
              <UpdateOrchidModal
                data={{
                  name: props.row.original.name,
                  category: props.row.original.category._id,
                  image: props.row.original.image,
                  isNatural: props.row.original.isNatural,
                  origin: props.row.original.origin
                }}
                orchidId={props.row.original._id}
              />
              <DeleteOrchidModal orchidName={props.row.original.name} orchidId={props.row.original._id} />
            </>
          )
        }
      }
    ],
    []
  )

  const getAllUser = async () => {
    try {
      const response = await getUsers()
      setUsers(response)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  const getCategories = async () => {
    try {
      const response = await getAllCategories()
      setCategories(response)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  const getAllOrchids = async () => {
    try {
      const response = await getAllOrchidsAdmin()
      setOrchids(response)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllUser()
    return () => {}
  }, [])

  useEffect(() => {
    getCategories()
    return () => {}
  }, [])

  useEffect(() => {
    getAllOrchids()
    return () => {}
  }, [])

  return !loading ? (
    <>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }} variant='h5'>
          Users
        </Typography>
        <MaterialReactTable data={users} columns={userColumns} />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }} variant='h5'>
          Categories
        </Typography>
        <CreateCategoryModal />
        <MaterialReactTable data={categories} columns={categoryColumns} />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ mb: 2 }} variant='h5'>
          Orchids
        </Typography>
        <CreateOrchidModal />
        <MaterialReactTable data={orchids} columns={orchidColumns} />
      </Box>
    </>
  ) : (
    <Loading />
  )
}

export default Dashboard
