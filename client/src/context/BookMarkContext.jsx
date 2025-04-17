// context/BookmarkContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import React from 'react';


const BookmarkContext = createContext();

const initialState = {
  bookmarks: {},  // { jobId: bookmarkId }
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_BOOKMARKS':
      return { ...state, bookmarks: action.payload, loading: false };
    case 'ADD_BOOKMARK':
      return { ...state, bookmarks: { ...state.bookmarks, [action.payload.jobId]: action.payload.bookmarkId } };
    case 'REMOVE_BOOKMARK':
      const updated = { ...state.bookmarks };
      delete updated[action.payload];
      return { ...state, bookmarks: updated };
    default:
      return state;
  }
};

export const BookmarkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Load saved bookmarks initially
    const fetchBookmarks = async () => {
      try {
        const res = await axiosInstance.get('/bookmarks/saved');
        const bookmarksMap = {};
        res.data.bookmarks.forEach((bm) => {
          bookmarksMap[bm.job._id] = bm._id;
        });
        dispatch({ type: 'LOAD_BOOKMARKS', payload: bookmarksMap });
      } catch (err) {
        console.error('Failed to load bookmarks', err);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
