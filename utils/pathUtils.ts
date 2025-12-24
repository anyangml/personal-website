/**
 * Path utility functions to handle resource path differences between
 * local development and GitHub Pages environments
 */

/**
 * Get the public path prefix for resources
 * On GitHub Pages, we need to add the /personal-website prefix
 * In local development environment, we can use relative paths
 */
export const getPublicPath = (): string => {
    const isGitHubPages = window.location.hostname.includes('github.io');
    // Also support local testing at /personal-website
    const isLocalPersonalWebsite = window.location.pathname.startsWith('/personal-website');
    return isGitHubPages || isLocalPersonalWebsite ? '/personal-website' : '';
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
    // Avoid double prefix
    if (prefix && path.startsWith(prefix + '/')) {
        return path;
    }
    return `${prefix}${path}`;
};
