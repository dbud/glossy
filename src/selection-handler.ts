import { debounce } from "./debounce"

export function createSelectionHandler({
  callback,
  maxLength = 60,
  debounceMs = 350,
}: {
  callback: (text: string) => void,
  maxLength?: number,
  debounceMs?: number,
}) {
  return debounce((text: string) => {
    if (!text || text.length > maxLength) {
      return
    }
    callback(text)
  }, debounceMs)
}
