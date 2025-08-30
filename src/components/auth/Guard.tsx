import { excludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/use-get-me";
import type { ReactNode } from "react";

interface GuardProps {
  children: ReactNode;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();

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
