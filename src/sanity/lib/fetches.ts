import { client } from "./client";
import { GalleryListQueryResult, NewsListQueryResult } from "../../../sanity.types";
import { galleryListQuery, newsListQuery } from "./queries";
import { YearListQueryParams } from "@/utils/serverHelpers";

export async function getYearNews(params : YearListQueryParams) {
    return client.fetch<NewsListQueryResult>(newsListQuery, params);
}

export async function getYearGallery(params: YearListQueryParams) {
    return client.fetch<GalleryListQueryResult>(galleryListQuery, params);
}