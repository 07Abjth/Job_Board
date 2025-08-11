 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  jobs: [],
  employers: [],
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setEmployers: (state, action) => {
      state.employers = action.payload;
    },
    deleteJobById: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    deleteUserById: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteEmployerById: (state, action) => {
      state.employers = state.employers.filter(emp => emp.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setUsers,
  setJobs,
  setEmployers,
  deleteJobById,
  deleteUserById,
  deleteEmployerById,
  setLoading,
} = adminSlice.actions;

export default adminSlice.reducer;
