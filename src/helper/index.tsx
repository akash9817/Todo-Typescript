import jwt_decode from "jwt-decode";
import {IUser} from '../types/types'

export const getUser = () => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      var decoded: IUser = jwt_decode(token);
      if (decoded.id) {
        return decoded
      } else {
        return false
      }
    } else {
      return false
    }
}