/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-11 20:05:51
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-11 20:25:38
 * 佛祖保佑没bug
 */
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
// TODO:  解决跨域问题
export const getClassificationList = () => {
  axios.get("/classification").then((res: any) => res.data);
};
