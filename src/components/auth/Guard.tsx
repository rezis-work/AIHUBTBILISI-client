import { excludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/use-get-me";
import { useEffect, type ReactNode } from "react";
import { authenticatedVar } from "../../constants/authenticated";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { snackVar } from "../../constants/snack";
import { usePath } from "../../hooks/use-path";

interface GuardProps {
  children: ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error && "networkError" in error) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  return (
    <>
      {excludedRoutes.includes(path as (typeof excludedRoutes)[number])
        ? children
        : user && children}
    </>
  );
};

export default Guard;
