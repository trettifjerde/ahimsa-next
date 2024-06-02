import { client } from "./client";
import { ContactQueryResult, FooterContactQueryResult, GalleryListQueryResult, LandingQueryResult, NewsArticleQueryResult, NewsListQueryResult, TeamQueryResult } from "../../../sanity.types";
import { contactQuery, footerContactQuery, galleryListQuery, landingQuery, newsArticleQuery, newsListQuery, teamQuery } from "./queries";
import { REVALIDATE_TIMEOUT, YearListQueryParams, getListQueryParams } from "@/utils/serverHelpers";

const nextParams = {next: {revalidate: REVALIDATE_TIMEOUT}};

export async function getLanding() {
    return client.fetch<LandingQueryResult>(landingQuery, {}, nextParams);
}

export async function getYearNews(params?: YearListQueryParams) {
    if (!params)
        params = getListQueryParams();

    if (!params)
        return null;

    // await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 3000);
    // });

    return client.fetch<NewsListQueryResult>(newsListQuery, params, nextParams);
}

export async function getArtcile(slug: string) {
    return client.fetch<NewsArticleQueryResult>(newsArticleQuery, {slug}, nextParams);
}

export async function getYearGallery(params?: YearListQueryParams) {
    if (!params)
        params = getListQueryParams();

    if (!params)
        return null;

    // await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 3000);
    // });

    return client.fetch<GalleryListQueryResult>(galleryListQuery, params, nextParams);
}

export async function getTeam() {
    return client.fetch<TeamQueryResult>(teamQuery, {}, nextParams);
}

export async function getFooterContacts() {
    return client.fetch<FooterContactQueryResult>(footerContactQuery, {}, nextParams);
}

export async function getContacts() {
    return client.fetch<ContactQueryResult>(contactQuery, {}, nextParams);
}