//import axios and add default header
import axios from "axios";

const token = localStorage.getItem("token");
export const axiosWithAuth = axios.create({
  // baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${token},`,
  },
});
