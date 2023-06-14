"use client";
import Loading from "@components/loading";
import { authContext } from "@context/UserCredential";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useContext(authContext);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (user && user?.uid) {
    return <>{children}</>;
  }
  return router.push("/singin");
};

export default PrivateRoutes;
