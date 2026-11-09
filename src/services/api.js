import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) =>
  API.post("/auth/login", data).then((res) => res.data);

// Dustbins
export const getDustbins = () => API.get("/dustbins").then((res) => res.data);
export const addDustbin = (data) => API.post("/dustbins", data);
export const updateDustbinStatus = (id, data) =>
  API.put(`/dustbins/${id}`, data);

// Reports
export const createReport = (data) => API.post("/reports", data);
export const getReports = () => API.get("/reports").then((res) => res.data);

export default API;
