import axios from "axios";

export const NODE_API = import.meta.env.VITE_NODE_API;
export const PY_API = import.meta.env.VITE_PYTHON_API;

export const nodeAxios = axios.create({
  baseURL: NODE_API,
  withCredentials: true,
});

export const pythonAxios = axios.create({
  baseURL: PY_API,
});
