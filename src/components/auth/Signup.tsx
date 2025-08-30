import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";
import { useCreateUser } from "../../hooks/use-create-user";

const Signup = () => {
  const [createUser] = useCreateUser();
  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async ({ email, password }) => {
        await createUser({
          variables: {
            createUserInput: {
              email,
              password,
            },
          },
        });
      }}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default Signup;
