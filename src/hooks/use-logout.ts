const useLogout = () => {
  const logout = async () => {
    const res = await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to logout.");
    }
  };

  return { logout };
};

export { useLogout };
