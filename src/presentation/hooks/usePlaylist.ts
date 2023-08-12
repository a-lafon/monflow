import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { routes } from "@/config/routes";
import { setPlaylist, removeTrack, addTrack } from "../redux/features/playlist/playlistSlice";
import { Track } from "@/domain/models/track";
import { playlistService } from "@/application/PlaylistService";

const usePlaylist = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state: RootState) => state.playlist);
  const [isLoading, setIsLoading] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalDurationFormatted, setTotalDurationFormated] = useState<string>();

  useEffect(() => {
    (async () => {
      if (playlist.length === 0) {
        const storedPlaylist = await playlistService.getAll();
        if (storedPlaylist.length >= 1) {
          dispatch(setPlaylist(storedPlaylist));
        }
      }
    })()
  }, [])

  useEffect(() => {
    setTotalDuration(playlist.reduce((acc, obj) => acc + obj.duration_ms, 0));
  }, [playlist]);

  useEffect(() => {
    setTotalDurationFormated(formatDuration(totalDuration))
  }, [totalDuration]);

  const add = (track: Track) => {
    playlistService.add(track);
    dispatch(addTrack(track));
  }

  const remove = (track: Track) => {
    playlistService.remove(track.id);
    dispatch(removeTrack(track.id));
  }

  const register = async () => {
    try {
      setIsLoading(true);
      await axios.post(routes.CREATE_PLAYLIST, {
        uris: playlist.map((p) => p.uri)
      });
      setIsLoading(false);
      reset();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const reset = () => {
    playlistService.removeAllTracks();
    dispatch(setPlaylist([]));
  }

  return {
    playlist,
    isLoading,
    totalDuration,
    totalDurationFormatted,
    reset,
    remove,
    add,
    register,
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

export default usePlaylist;