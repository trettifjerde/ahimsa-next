import { QueryParams } from "sanity";
import { getStoriesPageGroqParams, getYearPageGroqParams } from "@/utils/serverHelpers";
import { GroqStoriesParams, GroqYearParams } from "@/utils/types";
import { GALLERY_BATCH_SIZE, NEWS_BATCH_SIZE } from "@/utils/env-fallback";
import { client } from "./client";
import { CatStoriesQueryResult, CategoryByIdQueryResult, ContactQueryResult, FooterContactQueryResult, GalleryListQueryResult, LandingQueryResult, NewsArticleQueryResult, NewsListQueryResult, StoryCategoriesQueryResult, StoryQueryResult, TeamQueryResult, UncatStoriesQueryResult } from "../../../sanity.types";
import { catStoriesQuery, categoryByIdQuery, contactQuery, footerContactQuery, galleryListQuery, landingQuery, newsArticleQuery, newsListQuery, storyCategoriesQuery, storyQuery, teamQuery, uncatStoriesQuery } from "./queries";
import { StoryCategoryDict } from "./types";

async function sanityFetch<QueryResponse>({query, qParams = {}, tags}: {
    query: string;
    qParams?: QueryParams;
    tags: string[];
}): Promise<QueryResponse> {
    return client.fetch<QueryResponse>(query, qParams, {
        cache: "force-cache",
        next: { tags },
    });
}

export async function getLanding() {
    // await new Promise((res, rej) => setTimeout(() => res(1), 3000));
    
    return sanityFetch<LandingQueryResult>({
        query: landingQuery,
        tags: ["landing"]
    });
}

export async function getYearNews(params: GroqYearParams) {
    // await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 3000);
    // });

    return sanityFetch<NewsListQueryResult>({
        query: newsListQuery, 
        qParams: params, 
        tags: ["news"]
    });
}

export async function getNewsArticle(slug: string) {
    return sanityFetch<NewsArticleQueryResult>({
        query: newsArticleQuery, 
        qParams: { slug }, 
        tags: ["news"]
    });
}

export async function getYearGallery(params: GroqYearParams) {
    // await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 3000);
    // });

    return sanityFetch<GalleryListQueryResult>({
        query: galleryListQuery, 
        qParams: params, 
        tags: ["news", "story"]
    });
}

export async function getTeam() {
    return sanityFetch<TeamQueryResult>({
        query: teamQuery, 
        tags: ["member"]
    });
}

export async function getFooterContacts() {
    return sanityFetch<FooterContactQueryResult>({
        query: footerContactQuery, 
        tags: ["contacts"]
    });
}

export async function getContactsGreeting() {
    return sanityFetch<ContactQueryResult>({
        query: contactQuery, 
        tags: ["contacts"]
    })
}

export async function getStory(slug: string) {
    return sanityFetch<StoryQueryResult>({
        query: storyQuery, 
        qParams: {slug},
        tags: ["story"]
    });
}

export async function getCategoryId(slug: string) {
    return sanityFetch<CategoryByIdQueryResult>({
        query: categoryByIdQuery, 
        qParams: {slug},
        tags: ["storyCategory"]
    });
}

export async function getStories(params?: GroqStoriesParams) {
    if (!params)
        params = await getStoriesPageGroqParams();

    if (params === undefined)
        return null;

    if (params.catId)
        return sanityFetch<CatStoriesQueryResult>({
            query: catStoriesQuery, 
            qParams: params,
            tags: ["story"]
        });

    // await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 3000);
    // });

    return sanityFetch<UncatStoriesQueryResult>({
        query: uncatStoriesQuery, 
        qParams: params,
        tags: ["story"]
    });
}

export async function getCategories() {
    return sanityFetch<StoryCategoriesQueryResult>({
        query: storyCategoriesQuery, 
        tags: ["storyCategory"]
    });
}

export async function getCategoriesDict() {
    const colorFallback = 0;

    return getCategories()
        .then(cats => {
            if (!cats)
                return {};

            return cats.reduce((acc, cat) => {
                const { _id, name, color, slug } = cat;
                acc[_id] = {
                    name,
                    slug,
                    color: `${color?.r || colorFallback},${color?.g || colorFallback},${color?.b || colorFallback}`
                };
                return acc;

            }, {} as StoryCategoryDict);
        })
}