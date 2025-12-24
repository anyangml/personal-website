/**
 * Path utility functions to handle resource path differences between
 * local development and GitHub Pages environments
 */

/**
 * Get the public path prefix for resources
 * derived from Vite's base configuration
 */
export const getPublicPath = (): string => {
    // import.meta.env.BASE_URL corresponds to the "base" option in vite.config.ts
    // It defaults to "/" in dev if not set, or the specified path (e.g. "/personal-website/")
    // We remove the trailing slash to consistently append it to paths starting with "/"
    return import.meta.env.BASE_URL.endsWith('/')
        ? import.meta.env.BASE_URL.slice(0, -1)
        : import.meta.env.BASE_URL;
};

/**
 * Add public path prefix to resource paths
 * @param path Original resource path
 * @returns Resource path with public path prefix added
 */
export const getResourcePath = (path: string): string => {
    if (!path || !path.startsWith('/')) {
        return path;
    }
    const prefix = getPublicPath();

    // Avoid double prefix if the path already starts with the base
    if (prefix && path.startsWith(prefix + '/')) {
        return path;
    }
    return `${prefix}${path}`;
};
