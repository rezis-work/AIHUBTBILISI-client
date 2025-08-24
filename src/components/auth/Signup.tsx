import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";

const Signup = () => {
  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async () => {
        console.log("hi");
      }}
    >
      <Link to="/login" style={{ alignSelf: "center" }}>
        <MuiLink>Login</MuiLink>
      </Link>
    </Auth>
  );
};

export default Signup;
