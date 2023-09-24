import axios from "axios";
import { AdminUrl, UserUrl } from "../APIs/BaseUrl"; 
import { useSelector } from "react-redux";

export const AdminAxios = () => {
  const token = useSelector((state) => state?.adminDetails?.token);

  return axios.create({
    baseURL: AdminUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UserAxios = () => {
  const token = useSelector((state) => state?.userDetails?.token);

  return axios.create({
    baseURL: UserUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
