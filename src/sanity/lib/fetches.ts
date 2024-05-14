import { client } from "./client";
import { GalleryListQueryResult, LandingQueryResult, NewsListQueryResult } from "../../../sanity.types";
import { galleryListQuery, landingQuery, newsListQuery } from "./queries";
import { YearListQueryParams, getListQueryParams } from "@/utils/serverHelpers";

export async function getLanding() {
    return client.fetch<LandingQueryResult>(landingQuery);
}

export async function getYearNews(params?: YearListQueryParams) {
    if (!params)
        params = getListQueryParams({});

    if (!params)
        return null;

    return client.fetch<NewsListQueryResult>(newsListQuery, params);
}

export async function getYearGallery(params: YearListQueryParams) {
    if (!params)
        params = getListQueryParams({});

    if (!params)
        return null;

    return client.fetch<GalleryListQueryResult>(galleryListQuery, params);
}