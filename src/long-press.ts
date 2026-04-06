export function onLongPress(
  callback: () => void,
  durationMs: number = 500
) {
  let timer: number | undefined

  function start(e: PointerEvent) {
    if (e.button !== 0) return
    timer = window.setTimeout(callback, durationMs);
  }

  function cancel() {
    clearTimeout(timer);
  }

  document.addEventListener("pointerdown", start)
  for (const e of ["pointerup", "pointerleave", "pointercancel", "pointermove"]) {
    document.addEventListener(e, cancel)
  }
}
