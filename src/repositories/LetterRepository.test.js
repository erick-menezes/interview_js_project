import { getFullAddress } from "./functions/Letter/getFullAddress.js";

const functionMock = jest.fn((userData, postData) => {
    const data = userData?.map((user) => ({
        ...user,
        address: getFullAddress(user.address),
        company: user?.company?.name ?? null,
        posts: postData?.filter((post) => {
            if (post.userId === user.id) {
                delete post.userId;
                return post;
            }
        }) ?? null
    }));

    return data;
});

describe('LetterRepository module', () => {
    describe('getUsersWithPosts function', () => {
        test("it should return all the merged data if there are users and posts", () => {
            const userData = [
                {
                    "id": 1,
                    "name": "Leanne Graham",
                    "username": "Bret",
                    "email": "Sincere@april.biz",
                    "address": {
                      "street": "Kulas Light",
                      "suite": "Apt. 556",
                      "city": "Gwenborough",
                      "zipcode": "92998-3874",
                      "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                      }
                    },
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company": {
                      "name": "Romaguera-Crona",
                      "catchPhrase": "Multi-layered client-server neural-net",
                      "bs": "harness real-time e-markets"
                    }
                },
            ];
            const postData = [
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                },
            ];

            functionMock(userData, postData);

            expect(functionMock).toHaveLastReturnedWith([
                {
                    "id": 1,
                    "name": "Leanne Graham",
                    "username": "Bret",
                    "email": "Sincere@april.biz",
                    "address": "Kulas Light, Apt. 556 - 92998-3874 Gwenborough",
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company": "Romaguera-Crona",
                    "posts": [
                      {
                        "id": 1,
                        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                      },
                    ]
                }
            ]);
            
        });
    
        test("it should return all the merged data if there are only the users", () => {
            const userData = [
                {
                    "id": 1,
                    "name": "Leanne Graham",
                    "username": "Bret",
                    "email": "Sincere@april.biz",
                    "address": {
                      "street": "Kulas Light",
                      "suite": "Apt. 556",
                      "city": "Gwenborough",
                      "zipcode": "92998-3874",
                      "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                      }
                    },
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company": {
                      "name": "Romaguera-Crona",
                      "catchPhrase": "Multi-layered client-server neural-net",
                      "bs": "harness real-time e-markets"
                    }
                },
            ];
            const postData = undefined;

            functionMock(userData, postData);

            expect(functionMock).toHaveLastReturnedWith([{
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": "Kulas Light, Apt. 556 - 92998-3874 Gwenborough",
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": "Romaguera-Crona",
                "posts": null
            }]);
        });

        test("it should return undefined if there are only the posts", () => {
            const userData = undefined;
            const postData = [
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
            ]

            functionMock(userData, postData);

            expect(functionMock).toHaveLastReturnedWith(undefined);
        });

        test("it should return undefined if there are neither users nor posts", () => {
            const userData = undefined;
            const postData = undefined;

            functionMock(userData, postData);

            expect(functionMock).toHaveLastReturnedWith(undefined);
        });
    });
});