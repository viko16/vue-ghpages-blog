/**
 * remove '.md' and put the date in the end
 *
 * @param title
 * @returns {string}
 */
export function cleanTitle(title) {
    return title.replace(/\.md$/, '')
                .replace(/^(\d{4}-\d{2}-\d{2})-(.+)$/, '$2 - $1');
}

/**
 * get title from file name
 *
 * @param title
 * @returns {string}
 */
export function onlyTitle(title) {
    return title.replace(/^\d{4}-\d{2}-\d{2}-(.+?)\.md$/, '$1');
}

/**
 * get date from file name
 *
 * @param title
 * @returns {string}
 */
export function onlyPublishDate(title) {
    return /^\d{4}-\d{2}-\d{2}/.exec(title);
}