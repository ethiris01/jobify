// base url api/v1 is split and used as component
import axios from "axios";
const customFetch = axios.create({
  baseURL: "/api/v1",
});

export default customFetch;
