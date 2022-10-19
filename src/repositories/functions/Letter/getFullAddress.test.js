import { getFullAddress } from "./getFullAddress.js";

describe('getFullAddress function', () => {
    test("it should return null if the address object doesn't exists", () => {
        const addressObject = undefined;

        const fullAddress = getFullAddress(addressObject);
    
        expect(fullAddress).toBeNull();
    });

    test("it should return the full address string", () => {
        const addressObject = {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
        }

        const fullAddress = getFullAddress(addressObject);
    
        expect(fullAddress).toBe('Kulas Light, Apt. 556 - 92998-3874 Gwenborough');
    });

    test("it should return 'Unknown' when an user property is not defined", () => {
        const addressObject = {
            street: "Kulas Light",
            suite: null,
            city: "Gwenborough",
            zipcode: "92998-3874",
        }

        const fullAddress = getFullAddress(addressObject);
    
        expect(fullAddress).toBe('Kulas Light, Unknown suite - 92998-3874 Gwenborough');
    });
});