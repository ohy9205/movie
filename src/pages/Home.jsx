import React from "react";
import { logoutUser } from "../api/firebase";
import Button from "../components/ui/Button";
import { useAuthContext } from "../store/AuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div>
      Home
      {user && user.uid}
      {user && <Button text="logout" onClick={logoutUser} />}
    </div>
  );
}
