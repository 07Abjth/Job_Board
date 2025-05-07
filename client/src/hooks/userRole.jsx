import { useSelector } from "react-redux";

const useRole = () => {
  const user = useSelector((state) => state.user?.user);

  if (!user) return null;

  return user.role || null;
};

export default useRole;
