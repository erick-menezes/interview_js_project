import { JSON_API_USERS_ENDPOINT, JSON_API_POSTS_ENDPOINT } from "../utils/constants.js";

import { getFullAddress } from "./functions/Letter/getFullAddress.js";
import { fetchData } from "../utils/functions/fetchData.js";

/**
 * @description Get the data of both users and posts API to merge into one object, formatting to the correct data types.
 * 
 * @returns The merged data.
 */
export async function getUsersWithPosts() {
    try {
        const [users, posts] = await fetchData(JSON_API_USERS_ENDPOINT, JSON_API_POSTS_ENDPOINT);

        const data = users?.map((user) => ({
            ...user,
            address: getFullAddress(user.address),
            company: user?.company?.name ?? null,
            posts: posts?.filter((post) => {
                if (post.userId === user.id) {
                    delete post.userId;
                    return post;
                }
            }) ?? null
        }));

        return data;
    } catch(error) {
        console.log(error.message);
    }
}