import { useState } from "react";
import client from "../constants/apollo-client";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>("");

  const login = async (request: LoginRequest) => {
    const res = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are not valid");
      }
      return;
    } else {
      setError("Unexpected error occurred.");
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
