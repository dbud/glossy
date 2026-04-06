import { render } from "lit"
import { createPopup } from "./popup"
import { error, view } from "./view"
import { setupStyles } from "./styles"
import { debounce } from "./debounce"
import { onLongPress } from "./long-press"

const { popup, open } = createPopup()

async function define(text: string) {
  try {
    const definition = await browser.runtime.sendMessage({ type: "DEFINE", word: text })
    window.getSelection()?.removeAllRanges()
    render(view(definition), popup)
    popup.scrollTop = 0
    open()
  }
  catch (e) {
    console.error(e)
    render(error(e), popup)
    open()
  }
}

setupStyles()

let selection: string = ""
const handleSelection = debounce((text: string) => { selection = text })

document.addEventListener("selectionchange", () => {
  const text = window.getSelection()?.toString().trim()
  handleSelection(text)
})

onLongPress(() => {
  if (!selection || selection.length > 60) return
  define(selection)
})
