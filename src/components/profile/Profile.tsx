import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useGetMe } from "../../hooks/use-get-me";
import { UploadFile } from "@mui/icons-material";
import { snackVar } from "../../constants/snack";

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        formData.append("file", e.target.files[0]);
        const res = await fetch(`users/image`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to upload image.");
        }
      }
      snackVar({
        message: "Image uploaded successfully.",
        type: "success",
      });
    } catch {
      snackVar({
        message: "Error uploading image.",
        type: "error",
      });
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">{me?.data?.me.username}</Typography>
      <Avatar
        src={me?.data?.me.imageUrl}
        sx={{
          width: 256,
          height: 256,
        }}
      />
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;
