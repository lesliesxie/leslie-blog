/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-11 20:05:51
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-31 17:34:16
 * 佛祖保佑没bug
 */
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getClassificationList = () => {
  return axios.get("/classification").then((res: any) => res.data);
};

export const getContentList = () => {
  return axios.get("/contentList").then((res: any) => res.data);
};

export const queryContentListById = (id: number) => {
  return axios.get(`/contentList/${id}`).then((res: any) => res.data);
};

export const createContent = (data: any) => {
  return axios.post("/contentList", data).then((res: any) => res.data);
};

export const getLabelList = () => {
  return axios.get("/labelList").then((res: any) => res.data);
};

export const createLabel = (data: any) => {
  return axios.post("/labelList", data).then((res: any) => res.data);
};
