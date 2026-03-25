export function getSelectionRect() {
  const selection = window.getSelection()
  if (!selection?.rangeCount) return null

  const range = selection.getRangeAt(0).cloneRange()
  return range.getBoundingClientRect()
}
