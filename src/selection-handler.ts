import { debounce } from "./debounce"

export function createSelectionHandler({
  callback,
  cancel,
  maxLength = 60,
  debounceMs = 350,
  forgetMs = 1000,
}: {
  callback: (text: string) => void,
  cancel: () => void,
  maxLength?: number,
  debounceMs?: number,
  forgetMs?: number,
}) {
  let lastText = ""

  const forget = debounce(() => { lastText = "" }, forgetMs)

  return debounce((text: string) => {
    forget()
    if (!text || text === lastText || text.length > maxLength) {
      cancel()
      return
    }
    lastText = text
    callback(text)
  }, debounceMs)
}
