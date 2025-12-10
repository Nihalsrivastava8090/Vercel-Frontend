import axios from "axios";

export const NODE_API = import.meta.env.VITE_NODE_API;

export const nodeAxios = axios.create({
  baseURL: NODE_API,
  withCredentials: false,
});
