type Font = {
  path: string
  name: string
  style: "normal" | "italic"
}

async function loadFont({ path, name, style }: Font) {
  const response = await fetch(browser.runtime.getURL(path))
  const buffer = await response.arrayBuffer()
  const font = new FontFace(name, buffer, { style })
  await font.load()
  await document.fonts.add(font)
}

export async function setupStyles() {
  await loadFont({ path: "fonts/EBGaramond-VariableFont_wght.woff2", name: "EB Garamond", style: "normal" })
  await loadFont({ path: "fonts/EBGaramond-Italic-VariableFont_wght.woff2", name: "EB Garamond", style: "italic" })

  const style = document.createElement("style")
  style.textContent = `
    .scroll-lock {
      overflow: hidden !important;
    }
  `
  document.body.appendChild(style)
}
