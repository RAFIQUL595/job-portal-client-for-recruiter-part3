import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-for-recruiter-part3-six.vercel.app",
  withCredentials: true,
});
const useAxios = () => {
  const { signOutUser } = useAuth();
  const navigate=useNavigate()
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status == 401 || error.status == 403) {
          signOutUser()
            .then(() => {
              console.log("LogOut User");
              navigate("/signIn")
            })
            .catch((error) => {
              console.log("ERROR", error);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxios;
