export const debounce = (fn: (...args: any) => void, delay = 300) => {
  let timer: number | undefined
  return function (...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
