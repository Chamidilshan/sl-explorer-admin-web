import axios from "axios";

const api = axios.create({
    baseURL: "https://sl-explorer-40d1ca689c87.herokuapp.com",
    headers: {
        'Content-Type': 'application/json',
      }, 
});
 
export default api;
