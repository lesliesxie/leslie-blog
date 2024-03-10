/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-10 17:31:07
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-10 19:16:01
 * 佛祖保佑没bug
 */
export function throttle(func: Function, duration: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return (...args: any[]) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(null, args);
        timeoutId = null;
      }, duration);
    }
  };
}
