// components/admin/UsersTable.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUserById, setLoading } from '../../features/admin/adminSlice';
import { axiosInstance } from '../../config/axiosInstance';

const UsersTable = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axiosInstance.get('/api/users');
        dispatch(setUsers(res.data));
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/users/${id}`);
      dispatch(deleteUserById(id));
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete user.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersTable;