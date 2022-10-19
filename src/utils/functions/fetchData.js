/**
 * Fetch the url data and returns a promise.
 * 
 * @param {string} urls - The url to fetch the data.
 * 
 * @returns A promise with the request data.
 */
export async function fetchData(...urls) {
    const response = await Promise.all(
        urls.map(url => fetch(url).then(response => response.json()))
    ).then((data) => data);

    return response;
}