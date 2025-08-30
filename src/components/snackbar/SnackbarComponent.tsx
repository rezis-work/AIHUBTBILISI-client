import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useReactiveVar } from "@apollo/client/react";
import { snackVar } from "../../constants/snack";

export default function SnackbarComponent() {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <div>
          <Snackbar
            open={!!snack}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snack?.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snack?.message}
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
