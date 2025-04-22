import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../config/axiosInstance';  

export const UserProfileImage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        if (res.data?.success) setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const getInitialsAvatar = () => {
    const name = user?.name || '?';
    const parts = name.trim().split(' ');
    const initials = parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`
      : name[0];
    
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(0, 0, 200, 200);
    ctx.font = 'bold 100px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials.toUpperCase(), 100, 100);
    return canvas.toDataURL('image/png');
  };

  const profileSrc = user?.profilePic;

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img
        src={profileSrc || getInitialsAvatar()}
        alt="User Avatar"
        className="w-full h-full object-cover"
        onError={(e) => {
          console.log("Image failed to load:", e.target.src);
          e.target.onerror = null;
          e.target.src = getInitialsAvatar();
        }}
      />
    </div>
  );
};
