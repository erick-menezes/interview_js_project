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