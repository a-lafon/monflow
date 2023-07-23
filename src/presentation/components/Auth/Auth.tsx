import config from "@/config";
import useAuth from "@/presentation/hooks/useAuth";
import { FC, useEffect } from "react";

const Auth: FC<{ children: any }> = ({ children }) => {
  const { login, user } = useAuth();

  useEffect(() => {
    const isAuth = localStorage.getItem(config.authKey);
    if (isAuth && isAuth === 'true' && !user) {
      login();
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Auth;
