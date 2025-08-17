import { useState, useEffect } from "react";

interface DecodedToken {
  username?: string;
  email?: string;
  [key: string]: any;
}

const useUser = () => {
  const [user, setUser] = useState<{ username?: string; email?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // changed key to "authToken"
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const payload = token.split(".")[1];
      if (!payload) {
        setUser(null);
        return;
      }

      const decoded: DecodedToken = JSON.parse(atob(payload));
      setUser({ username: decoded.username, email: decoded.email });
    } catch (err) {
      console.error("Failed to decode token:", err);
      setUser(null);
    }
  }, []);

  return user;
};

export default useUser;
