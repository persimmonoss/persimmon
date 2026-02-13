/**
 * Validate if a string is a proper URL
 * @param {string} url 
 * @returns {boolean}
 */
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensure a URL has a protocol
 * @param {string} url 
 * @returns {string}
 */
export function normalizeURL(url) {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Simple delay function
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format long URLs for display (truncate middle)
 * @param {string} url 
 * @param {number} maxLength 
 * @returns {string}
 */
export function truncateURL(url, maxLength = 50) {
  if (url.length <= maxLength) return url;
  const half = Math.floor(maxLength / 2);
  return url.slice(0, half) + '...' + url.slice(url.length - half);
}