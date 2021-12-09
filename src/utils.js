export const decodeHTMLContent = input => {
  if (!input) return ''
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}
