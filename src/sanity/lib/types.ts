import { CatStoriesQueryResult, FooterContactQueryResult, GalleryListQueryResult, NewsArticleQueryResult, NewsListQueryResult, StoryCategoriesQueryResult, StoryQueryResult, TeamQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];
export type NewsArticle = Exclude<NewsArticleQueryResult, null>;

export type StoryArticle = Exclude<StoryQueryResult, null>;
export type StoryPreview = CatStoriesQueryResult[0];

export type GalleryEntry = GalleryListQueryResult[0];
export type NewsEntryGallery = Exclude<NewsArticle['gallery'], null>;
export type ImageInfo = NewsListPreviewItem['image'];
export type ImageFullInfo = NewsArticle['image'];
export type AnyImageInfo = (Exclude<ImageInfo, null> & {width?: number | null, height?: number | null}) | null;
export type GalleryEntryPic = {image: ImageFullInfo, title?: string, slug?: string, id: string};

export type UdrugaMember = TeamQueryResult[0];

export type FooterInfo = Exclude<FooterContactQueryResult, null>;
export type ContactOtherInfo = FooterInfo['other'][0];

export type StoryCategory = StoryCategoriesQueryResult[0];
export type StoryCategoriesIds = StoryArticle['categories'];
export type StoryCategoryDict = {[key: string]: Omit<StoryCategory, '_id'|'color'> & {color: string}};