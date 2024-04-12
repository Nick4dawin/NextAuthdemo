/**
 * An array of routes that dont require authentication
 */

export const publicRoutes = [
    '/',
    '/auth/new-verification',
]
/**
 * An array of routes that require authentication
 * These routes will login user to /settings
 */
export const  authRoutes = [
    'auth/login',
    'auth/register',
    'auth/error',
    '/auth/reset',
    '/auth/new-password'
]

/**
 * The prefix for all API routes
 */
export const apiAuthPrefix = '/api/auth';


/**
 * The default redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';