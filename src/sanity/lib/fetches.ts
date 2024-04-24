import { client } from "./client";
import { NewsListQueryResult } from "../../../sanity.types";
import { newsListQuery } from "./queries";

export async function getYearNews(params : {lastDate: string, limit: string, lastId: string, batchSize: number}) {

    return client.fetch<NewsListQueryResult>(newsListQuery, params);
}