const useLogout = () => {
  const logout = async () => {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  return { logout };
};

export { useLogout };
