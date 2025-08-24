import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
}

const Auth = ({ submitLabel, onSubmit, children }: AuthProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    await onSubmit({ email, password });
  };

  return (
    <Stack
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "50%",
          lg: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
