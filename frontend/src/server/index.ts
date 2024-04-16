/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-11 20:05:51
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-16 22:33:30
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

export const getCommentList = (contentListId: number) => {
  return axios
    .get(`/commentList/${contentListId}/comments`)
    .then((res: any) => res.data);
};

export const createComment = (contentListId: number, data: any) => {
  return axios
    .post(`/commentList/${contentListId}/comment`, data)
    .then((res: any) => res.data);
};

export const register = (data: any) => {
  return axios.post("/user/register", data).then((res: any) => res.data);
};

export const login = (data: any) => {
  return axios.post("/user/login", data).then((res: any) => res.data);
};

export const getUser = (userName: string) => {
  return axios.get(`/user/${userName}`).then((res: any) => res.data);
};

export const updateUser = (id: number, data: any) => {
  return axios.put(`/user/${id}`, data).then((res: any) => res.data);
};
