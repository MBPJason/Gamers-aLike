import axios from "axios";
import { jsonwebtoken as jwt } from "jsonwebtoken";

const API = {
  async getUserInfo(id) {
    return await axios.get(`/api/user/${id}`).then((res) => {
      const decoded = jwt.verify(res.body.userInfo, process.env.SECRET);
      return decoded;
    });
  },
};

export default API;
