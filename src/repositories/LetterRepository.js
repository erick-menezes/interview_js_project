import { JSON_API_USERS_ENDPOINT, JSON_API_POSTS_ENDPOINT } from "../utils/constants.js";

import { getFullAddress } from "./functions/Letter/getFullAddress.js";
import { fetchData } from "../utils/functions/fetchData.js";

export async function getUsersWithPosts() {
    try {
        const [users, posts] = await Promise.all([
            fetchData(JSON_API_USERS_ENDPOINT), 
            fetchData(JSON_API_POSTS_ENDPOINT)
        ]).then((data) => data);

        const data = users.map((user) => ({
            ...user,
            address: getFullAddress(user.address),
            company: user?.company?.name ?? null,
            posts: posts.filter((post) => post.userId === user.id).map((post) => ({
                id: post.id,
                title: post.title,
                body: post.body,
            })),
        }));

        return data;
    } catch(error) {
        console.log(error.message);
        
        return error.message;
    }
}