/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-11 20:05:51
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-16 18:48:01
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
