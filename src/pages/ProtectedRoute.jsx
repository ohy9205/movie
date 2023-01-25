import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign_in");
    }
  }, [user]);

  return children;
}
