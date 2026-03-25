import type { paths } from "./types/api"

export type Definition = paths["/entries/{language}/{word}"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"]

let cache: Record<string, Definition> = {}

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "DEFINE") {
    const { word } = message
    if (cache[word]) return word
    try {
      const response = await fetch(
        `https://freedictionaryapi.com/api/v1/entries/en/${word}`
      )
      const definition: Definition = await response.json()
      cache[word] = definition
      return definition
    } catch (e) {
      console.error(e)
      return null
    }
  }
});
