import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { routes } from "@/config/routes";
import config from "@/config";

const useAuth = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state: RootState) => state.playlist);
  const [isLoading, setIsLoading] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalDurationFormatted, setTotalDurationFormated] = useState<string>();

  useEffect(() => {
    setTotalDuration(playlist.reduce((acc, obj) => acc + obj.duration_ms, 0));
  }, [playlist]);

  useEffect(() => {
    if (totalDuration > 0) {
      setTotalDurationFormated(formatDuration(totalDuration))
    }
  }, [totalDuration])

  return {
    playlist,
    isLoading,
    totalDuration,
    totalDurationFormatted
  }
}

const formatDuration = (duration_ms: number): string => {
  const millisecondsInSecond = 1000;
  const millisecondsInMinute = millisecondsInSecond * 60;
  const millisecondsInHour = millisecondsInMinute * 60;

  const hours = Math.floor(duration_ms / millisecondsInHour);
  duration_ms %= millisecondsInHour;

  const minutes = Math.floor(duration_ms / millisecondsInMinute);

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours}h`;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes}min`;
  }

  return formattedDuration;
}

export default useAuth;