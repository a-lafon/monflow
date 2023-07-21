import { SearchResult } from "@/domain/models/search";
import { User } from "@/domain/models/user";
import axios from "axios";
import useSWR from "swr";

const apiUrl = '/api';

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const useSearch = (value: string) => useSWR<SearchResult[]>(`${apiUrl}/search?q=${value}`, fetcher);

export const useMe = () => useSWR<User>(`${apiUrl}/me`, fetcher);