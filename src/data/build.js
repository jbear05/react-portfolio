/* global __BUILD_DATE__ */

// Injected by vite.config.js, so the revision stamp updates on every deploy.
export const REVISION = __BUILD_DATE__.replaceAll("-", ".");
export const BUILD_YEAR = __BUILD_DATE__.slice(0, 4);
