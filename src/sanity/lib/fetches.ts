import { client } from "./client";
import { CatStoriesQueryResult, CategoryByIdQueryResult, ContactQueryResult, FooterContactQueryResult, GalleryListQueryResult, LandingQueryResult, NewsArticleQueryResult, NewsListQueryResult, StoryCategoriesQueryResult, StoryQueryResult, TeamQueryResult, UncatStoriesQueryResult } from "../../../sanity.types";
import { catStoriesQuery, categoryByIdQuery, contactQuery, footerContactQuery, galleryListQuery, landingQuery, newsArticleQuery, newsListQuery, storyCategoriesQuery, storyQuery, teamQuery, uncatStoriesQuery } from "./queries";
import { getStoriesPageGroqParams, getYearPageGroqParams } from "@/utils/serverHelpers";
import { StoryCategoryDict } from "./types";
import { GroqStoriesParams, GroqYearParams } from "@/utils/types";
import { GALLERY_BATCH_SIZE, NEWS_BATCH_SIZE, REVALIDATE_TIMEOUT } from "@/utils/env-fallback";

const nextParams = {next: {revalidate: REVALIDATE_TIMEOUT}};

export async function getLanding() {
    return client.fetch<LandingQueryResult>(landingQuery, {}, nextParams);
}

export async function getYearNews(params?: GroqYearParams) {
    if (!params)
        params = getYearPageGroqParams(NEWS_BATCH_SIZE);

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

export async function getYearGallery(params?: GroqYearParams) {
    if (!params)
        params = getYearPageGroqParams(GALLERY_BATCH_SIZE);

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

export async function getStory(slug: string) {
    return client.fetch<StoryQueryResult>(storyQuery, {slug}, nextParams);
}

export async function getCategoryId(slug: string) {
    return client.fetch<CategoryByIdQueryResult>(categoryByIdQuery, {slug}, nextParams);
}

export async function getStories(params?: GroqStoriesParams) {
    if (!params)
        params = await getStoriesPageGroqParams();

    if (params === undefined)
        return null;

    if (params.catId)
        return client.fetch<CatStoriesQueryResult>(catStoriesQuery, params, nextParams);
        
    return client.fetch<UncatStoriesQueryResult>(uncatStoriesQuery, params, nextParams);
}

export async function getCategories() {
    return client.fetch<StoryCategoriesQueryResult>(storyCategoriesQuery, {}, nextParams);
}

export async function getCategoriesDict() {
    const colorFallback = 0;
    
    return getCategories()
        .then(cats => {
            if (!cats)
                return {};

            return cats.reduce((acc, cat) => {
                const {_id, name, color, slug } = cat;
                acc[_id] = {
                    name, 
                    slug, 
                    color: `${color?.r || colorFallback },${color?.g || colorFallback },${color?.b || colorFallback}`
                };
                return acc;

            }, {} as StoryCategoryDict);
        })
}