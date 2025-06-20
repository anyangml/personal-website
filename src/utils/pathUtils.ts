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
    return isGitHubPages ? '/personal-website' : '';
};

/**
 * Add public path prefix to resource paths
 * @param path Original resource path
 * @returns Resource path with public path prefix added
 */
export const getResourcePath = (path: string): string => {
    // If the path is empty or not a relative path starting with '/', return it directly
    if (!path || !path.startsWith('/')) {
        return path;
    }
    
    return `${getPublicPath()}${path}`;
};
