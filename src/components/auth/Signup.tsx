import { Link } from "react-router-dom";
import { Link as MuiLink, TextField } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/use-create-user";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/use-login";
import {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
} from "../../constants/errors";
import { snackVar } from "../../constants/snack";

const Signup = () => {
  const { login } = useLogin();
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  return (
    <Auth
      submitLabel="Signup"
      extraFields={[
        <TextField
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          helperText={error ? error : ""}
        />,
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });
          await login({ email, password });
          setError("");
        } catch (error) {
          const errorMessage = extractErrorMessage(error);
          if (errorMessage) {
            setError(errorMessage);
            return;
          }
          setError(UNKNOWN_ERROR_MESSAGE);
          snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
        }
      }}
      error={error}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default Signup;
