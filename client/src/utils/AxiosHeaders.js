import axios from "axios";
import Cookies from "js-cookie";

const authToken = Cookies.get("__AUTH") ? Cookies.get("__AUTH").split(":")[1] : undefined
const cookieToken =  authToken ? authToken.split(".") : undefined;
const trueToken = cookieToken ? cookieToken[0] + "." + cookieToken[1] + "." + cookieToken[2] : undefined;

const instance = axios.create({
  baseURL: "http://localhost:3000",
});



instance.defaults.headers['Authorization'] =
trueToken !== undefined ? `Bearer ${trueToken}` : "";

export default instance;
