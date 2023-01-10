import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, user }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/sign_in");
    }
  }, [user]);
  return children;
}
