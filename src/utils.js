export const decodeHTMLContent = input => {
  if (!input) return ''
  const doc = new DOMParser().parseFromString(input, 'text/html')
  return doc.documentElement.textContent
}

/**
 * Convert a number to currency string
 * @param {Number} input
 * @param {String} locale
 * @param {String} currency
 * @returns {String}
 */
export const toLocaleStringCurrency = (input, locale = 'en-US', currency = 'USD') => {
  if (!input) return ''
  return input.toLocaleString(locale, {
    style: 'currency',
    currency
  })
}
