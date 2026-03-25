import { getSelectionRect } from "./selection-rect"
import { createContainer } from "./shadow-container"

const WIDTH = 400

export const container = createContainer({
  containerId: 'popup',
  style: `
    :host {
      all: initial;
    }

    @font-face {
      font-family: "EB Garamond";
      src: url("${browser.runtime.getURL("fonts/EBGaramond-VariableFont_wght.ttf")}");
      font-style: normal;
      font-weight: 400 800;
    }

    #popup {
      position: absolute;
      z-index: 10000;
      width: ${WIDTH}px;

      background: #fff;
      color: #000;
      border: 1px solid #eee;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);

      font-family: "EB Garamond";
      font-size: 14px;
      padding: 12px;
    }

    .word {
      font-weight: 600;
    }

    .example {
      font-style: italic;
      opacity: 0.5;
    }
  `
})

export function close() {
  container.style.display = "none"
}

export function open() {
  const rect = getSelectionRect()
  if (!rect) return

  const margin = 8

  let top = rect.bottom + window.scrollY + margin
  let left = rect.left + window.scrollX

  if (left + WIDTH > window.innerWidth - margin) {
    left = window.innerWidth - WIDTH - margin
  }

  container.style.display = 'block'
  container.style.top = `${top}px`
  container.style.left = `${left}px`
}
