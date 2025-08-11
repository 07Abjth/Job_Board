import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  setUsers,
  setJobs,
  setEmployers,
  setLoading,
} from '../features/admin/adminSlice'
import { axiosInstance } from '../utils/axios' // adjust the path if needed

import UsersTable from '../components/admin/UsersTable'
import JobsTable from '../components/admin/JobsTable'
import EmployersTable from '../components/admin/EmployersTable'

const AdminPanel = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAdminData = async () => {
      dispatch(setLoading(true))
      try {
        const [usersRes, jobsRes, employersRes] = await Promise.all([
          axiosInstance.get('/api/users'),
          axiosInstance.get('/api/jobs'),
          axiosInstance.get('/api/employers'),
        ])

        dispatch(setUsers(usersRes.data))
        dispatch(setJobs(jobsRes.data))
        dispatch(setEmployers(employersRes.data))
      } catch (error) {
        console.error('🔴 Error fetching admin data:', error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchAdminData()
  }, [dispatch])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UsersTable />
        <JobsTable />
        <EmployersTable />
      </div>
    </div>
  )
}

export default AdminPanel
