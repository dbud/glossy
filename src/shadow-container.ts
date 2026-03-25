export function createContainer({
  containerId,
  style: styleText,
  globalStyle: globalStyleText
}: {
  containerId: string,
  style: string,
  globalStyle: string
}) {
  const host = document.createElement("div")
  const shadow = host.attachShadow({ mode: "closed" })

  const container = document.createElement("div")
  container.id = containerId

  const style = document.createElement("style")
  style.textContent = styleText

  shadow.appendChild(style)
  shadow.appendChild(container)
  document.body.appendChild(host)

  const globalStyle = document.createElement("style")
  globalStyle.textContent = globalStyleText
  document.body.appendChild(globalStyle)

  return container
}
