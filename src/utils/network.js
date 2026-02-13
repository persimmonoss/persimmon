/**
 * Fetch wrapper with error handling and timeout
 * @param {string} url 
 * @param {object} options 
 * @param {number} timeout 
 * @returns {Promise<Response>}
 */
export async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    console.error('Network error:', error);
    throw error;
  }
}

/**
 * Simple GET request returning JSON
 * @param {string} url 
 * @param {number} timeout 
 * @returns {Promise<any>}
 */
export async function getJSON(url, timeout = 10000) {
  const response = await fetchWithTimeout(url, { method: 'GET' }, timeout);
  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
}

/**
 * Check if browser is online
 * @returns {boolean}
 */
export function isOnline() {
  return navigator.onLine;
}