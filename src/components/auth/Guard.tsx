import { excludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/use-get-me";
import { useEffect, type ReactNode } from "react";
import { authenticatedVar } from "../../constants/authenticated";

interface GuardProps {
  children: ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(
        window.location.pathname as (typeof excludedRoutes)[number]
      )
        ? children
        : user && children}
    </>
  );
};

export default Guard;
