import { client } from "./client";
import { NewsListQueryResult } from "../../../sanity.types";
import { newsListQuery } from "./queries";

export async function getYearNews(params : {}) {

    return client.fetch<NewsListQueryResult>(newsListQuery, params);
}
