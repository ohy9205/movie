import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // if (user === null && count !== 0) {
    if (user === null && count !== 0) {
      navigate("/sign_in");
    }
    setCount((count) => count + 1);
  }, [user]);

  return children;
}
