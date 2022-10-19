const fetchDataMock = jest.fn(async (...urls) => {
    const response = await Promise.all(
        urls
    ).then((data) => data);

    return response;
}) 

describe('fetchData function', () => {
    test("it should return all the data from their sources correctly if the Promise object have data", async () => {
        const firstPromise = Promise.resolve({ data: 1 });
        const secondPromise = Promise.resolve({ data: 2 });
        const thirdPromise = Promise.resolve({ data: 3 });

        await fetchDataMock(
            firstPromise,
            secondPromise,
            thirdPromise
        ).then(data => expect(data).toStrictEqual([{ data: 1 }, { data: 2 }, { data: 3 }]));
    });

    test("it should return undefined inside the array data if the Promise object is undefined", async () => {
        const firstPromise = undefined;

        await fetchDataMock(
            firstPromise,
        ).then(data => expect(data).toStrictEqual([undefined]));
    });

    test("it should return undefined and the other data inside the array if the Promise objects is both undefined and with data", async () => {
        const firstPromise = undefined;
        const secondPromise = Promise.resolve({ data: 2 });

        await fetchDataMock(
            firstPromise,
            secondPromise
        ).then(data => expect(data).toStrictEqual([undefined, { data: 2 }]));
    });
});