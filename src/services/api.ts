import axios from "axios";

const api = axios.create({
  baseURL: "https://nova.bitcambio.com.br/api/v3/public",
});

export { api };
