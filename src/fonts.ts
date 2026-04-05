import garamond from "../fonts/EBGaramond-VariableFont_wght.woff2"
import garamondItalic from "../fonts/EBGaramond-Italic-VariableFont_wght.woff2"

export function setupFonts() {
  const style = document.createElement("style")
  style.textContent = `
  @font-face {
    font-family: "EB Garamond";
    src: url("${garamond}") format("woff2");
    font-weight: 400 800;
    font-style: normal;
  }

  @font-face {
    font-family: "EB Garamond";
    src: url("${garamondItalic}") format("woff2");
    font-weight: 400 800;
    font-style: italic;
  }
`
  document.body.appendChild(style)
}
