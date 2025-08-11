// components/admin/JobsTable.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, deleteJobById, setLoading } from '../../features/admin/adminSlice';
import { axiosInstance } from '../../config/axiosInstance';

const JobsTable = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axiosInstance.get('/api/jobs');
        dispatch(setJobs(res.data));
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchJobs();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/api/jobs/${id}`);
      dispatch(deleteJobById(id));
      alert('Job deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete job.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Jobs</h2>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul className="space-y-2">
          {jobs.map((job) => (
            <li key={job.id} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
              <button
                onClick={() => handleDelete(job.id)}
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

export default JobsTable;
