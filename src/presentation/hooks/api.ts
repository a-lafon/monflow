import { SearchApiResponse } from "@/pages/api/search";
import axios from "axios";
import useSWR from "swr";

const apiUrl = '/api';

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const useSearch = (value: string) => useSWR<SearchApiResponse[]>(`${apiUrl}/search?q=${value}`, fetcher);