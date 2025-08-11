// components/admin/EmployersTable.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployers, deleteEmployerById, setLoading } from '../../features/admin/adminSlice';
import { axiosInstance } from '../../config/axiosInstance';

const EmployersTable = () => {
  const dispatch = useDispatch();
  const { employers, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchEmployers = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axiosInstance.get('/api/employers');
        dispatch(setEmployers(res.data));
      } catch (err) {
        console.error('Failed to fetch employers:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchEmployers();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this employer?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/employers/${id}`);
      dispatch(deleteEmployerById(id));
      alert('Employer deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete employer.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Employers</h2>
      {loading ? (
        <p>Loading employers...</p>
      ) : (
        <ul className="space-y-2">
          {employers.map((emp) => (
            <li key={emp.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">{emp.companyName}</p>
                <p className="text-sm text-gray-600">{emp.email}</p>
              </div>
              <button
                onClick={() => handleDelete(emp.id)}
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

export default EmployersTable;