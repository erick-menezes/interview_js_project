/**
 * Generates a full address string from the address object.
 * 
 * @param {object} address - The address object, containing the street, suite, zip code and city informations.
 * 
 * @returns A string with all information together. If the address object is inexistent, returns null.
 */
export function getFullAddress(address) {
    if (!address) {
        return null;
    }

    const street = address?.street ?? 'Unknown street';
    const suite = address?.suite ?? 'Unknown suite';
    const zipCode = address?.zipcode ?? 'Unknown zip code';
    const city = address?.city ?? 'Unknown city';

    return `${street}, ${suite} - ${zipCode} ${city}`;
}