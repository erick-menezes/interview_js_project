/**
 * Fetch the url data and returns a promise.
 * 
 * @param {string} url - The url to fetch the data.
 * 
 * @returns A promise.
 */
export async function fetchData(url) {
    return fetch(url).then(response => response.json());
}