/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-03-10 17:31:07
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-17 17:31:48
 * 佛祖保佑没bug
 */

// 改造：通过Date.now()实现既能在duration内只执行一次，也能在首次或者超过duration时及时触发
export function throttle(func: Function, duration: number) {
  let lastClickTime = 0;

  return (...args: any[]) => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime >= duration) {
      func.apply(null, args);
      lastClickTime = currentTime;
    }
  };
}
// 这个写法是基础写法，只能实现duration时间内，只执行一次，但会存在第一次执行或者不需要执行时反应不及时的问题
// export function throttle(func: Function, duration: number) {
//   let timeoutId: ReturnType<typeof setTimeout> | null;
//   return (...args: any[]) => {
//     if (!timeoutId) {
//       timeoutId = setTimeout(() => {
//         func.apply(null, args);
//         timeoutId = null;
//       }, duration);
//     }
//   };
// }
