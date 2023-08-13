import { User } from "@/domain/models/user";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuth } from "../redux/features/auth/authSlice";
import { setUser } from "../redux/features/auth/authSlice";
import { useState } from "react";
import { routes } from "@/config/routes";
import config from "@/config";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const setIsAuth = (state: boolean) => {
    localStorage.setItem(config.authKey, state.toString())
    dispatch(setAuth(state));
  }

  const autologin = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<User>(routes.ME);
      dispatch(setUser(res.data));
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      resetState();
    }
  }

  const logout = async () => {
    try {
      resetState();
      router.push(routes.LOGOUT);
    } catch (error) {
      console.error(error);
      resetState();
    }
  }

  const resetState = () => {
    setIsAuth(false);
    dispatch(setUser(undefined));
  }

  return { isAuth, user, autologin, logout, isLoading, setIsAuth }
}

export default useAuth;