import { CatStoriesQueryResult, FooterContactQueryResult, GalleryListQueryResult, NewsArticleQueryResult, NewsListQueryResult, StoryCategoriesQueryResult, StoryQueryResult, TeamQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];
export type NewsArticle = Exclude<NewsArticleQueryResult, null>;

export type StoryArticle = Exclude<StoryQueryResult, null>;
export type StoryPreview = CatStoriesQueryResult[0];

export type GalleryEntry = GalleryListQueryResult[0];
export type NewsEntryGallery = Exclude<NewsArticle['gallery'], null>;
export type ImageInfo = null | Omit<Exclude<NewsArticle['image'], null>, 'width'|'aspectRatio'> & {
    width?: number | null, 
    aspectRatio?: number | null
};
export type GalleryEntryPic = {image: ImageInfo, title?: string, slug?: string, id: string};

export type UdrugaMember = TeamQueryResult[0];

export type FooterInfo = Exclude<FooterContactQueryResult, null>;
export type ContactOtherInfo = FooterInfo['other'][0];

export type StoryCategory = StoryCategoriesQueryResult[0];
export type StoryCategoryDict = {[key: string]: {name: string, color: string}};