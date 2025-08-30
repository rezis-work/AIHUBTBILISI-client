import { useState } from "react";
import client from "../constants/apollo-client";
import {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
} from "../constants/errors";
import { snackVar } from "../constants/snack";

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
      } else {
        setError(UNKNOWN_ERROR_MESSAGE);
        snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      }
      return;
    }
    setError("");
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
