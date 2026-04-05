import { render } from "lit"
import { createPopup } from "./popup"
import { createSelectionHandler } from "./selection-handler"
import { error, view } from "./view"
import { setupFonts } from "./fonts"

const { popup, open, close } = createPopup()

async function define(text: string) {
  try {
    const definition = await browser.runtime.sendMessage({ type: "DEFINE", word: text })
    render(view(definition), popup)
    open()
  }
  catch (e) {
    console.error(e)
    render(error(e), popup)
    open()
  }
}

const handleSelection = createSelectionHandler({
  callback: define,
  cancel: close,
})

setupFonts()

document.addEventListener("selectionchange", () => {
  const text = window.getSelection()?.toString().trim()
  handleSelection(text)
})
