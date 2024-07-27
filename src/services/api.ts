import axios from "axios";

const baseUrl = process.env.BASE_URL;
const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const server = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const client = axios.create({
  baseURL: clientUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default { server, client };
