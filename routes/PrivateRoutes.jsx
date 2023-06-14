"use client";
import { authContext } from "@context/UserCredential";
import { useRouter } from "next/router";
import { useContext } from "react";
// import "../styles/globals.css";
import Loading from "@components/loading";
import "next/client";

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
