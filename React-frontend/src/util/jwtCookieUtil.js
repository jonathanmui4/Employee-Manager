import Cookies from 'js-cookie';

// Configurable options for setting the JWT cookie
const defaultOptions = {
  expires: 7, // Expires in 7 days
  secure: false, // Only send over HTTPS
  httpOnly: true, // Prevent JavaScript access
  sameSite: 'strict' // Restrict cookie sending to same-site requests
};

/**
 * Sets the JWT cookie with the provided token and options.
 * @param {string} token - The JWT token to store.
 * @param {object} options (optional) - Configuration options for the cookie.
 */
export function setJWTCookie(token) {
  // const mergedOptions = { ...defaultOptions, ...options };
  console.log("executed: ", token);
  Cookies.set('jwt', token);
}

/**
 * Retrieves the JWT cookie value if it exists.
 * @returns {string|undefined} - The JWT token stored in the cookie, or undefined if not found.
 */
export function getJWTCookie() {
  return Cookies.get('jwt');
}

/**
 * Clears the JWT cookie by setting the expiration date to the past.
 */
export function clearJWTCookie() {
  Cookies.remove('jwt');
}