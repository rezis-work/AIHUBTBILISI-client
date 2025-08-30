import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";
import { useLogin } from "../../hooks/use-login";

const Login = () => {
  const { login, error } = useLogin();
  return (
    <Auth
      submitLabel="Login"
      onSubmit={(request) => login(request)}
      error={error}
    >
      <Link to="/signup" style={{ alignSelf: "center" }}>
        <MuiLink>Signup</MuiLink>
      </Link>
    </Auth>
  );
};

export default Login;
