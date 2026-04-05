export function debounce<F extends (...args: unknown[]) => void>(fn: F, delay = 300) {
  let timer: number | undefined
  return function (...args: Parameters<F>) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
