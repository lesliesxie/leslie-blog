/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-26 22:24:22
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-26 23:13:18
 * 佛祖保佑没bug
 */

export default function showMessage(
  message: string,
  type: string,
  showTime: number
) {
  type = type || "success";
  showTime = showTime || 30000;
  const msgBox = document.createElement("div");
  msgBox.textContent = message;
  msgBox.className = `message-box message-${type}`;
  document.body.appendChild(msgBox);
  setTimeout(() => {
    document.body.removeChild(msgBox);
  }, showTime);
}
