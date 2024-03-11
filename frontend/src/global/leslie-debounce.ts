/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-11 21:37:43
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-11 21:40:36
 * 佛祖保佑没bug
 */

export function debounce(func: Function, duration: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, duration);
  };
}
