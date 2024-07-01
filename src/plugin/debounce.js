/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-27 19:09:32
 * @Url: https://u.mr90.top
 * @github: https://github.com/ryanuo
 * @LastEditTime: 2021-11-27 19:09:33
 * @LastEditors: Harry
 */
/**
 * @desc 防抖函数
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 * @param {是否立即执行} immediate
 */
export function debounce(func, wait, immediate) {
  let timeout
  return function (...args) {
    const context = this
    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}
