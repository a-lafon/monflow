import { User } from "@/domain/models/user";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuth } from "../redux/features/auth/authSlice";
import { setUser } from "../redux/features/auth/authSlice";
import config from "@/config";
import { useState } from "react";

const authKey = config.authKey;

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<User>('/api/me');
      localStorage.setItem(authKey, 'true')
      dispatch(setAuth(true));
      dispatch(setUser(res.data));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      resetState();
    }
  }

  const logout = async () => {
    try {
      resetState();
      await axios.get('/api/logout');
    } catch (error) {
      console.error(error);
      resetState();
    }
  }

  const resetState = () => {
    localStorage.setItem(authKey, 'false');
    dispatch(setAuth(false));
    dispatch(setUser(undefined));
  }

  return { isAuth, user, login, logout, isLoading }
}

export default useAuth;