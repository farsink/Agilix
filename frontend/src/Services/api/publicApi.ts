import axios from "axios";

const publicApi = axios.create({
  baseURL: process.env.URL_SERVER,
  timeout: 10000,
});

export default publicApi;