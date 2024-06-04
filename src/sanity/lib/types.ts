import { makeGalleryPics, makePics } from "@/utils/serverHelpers";
import { CatStoriesQueryResult, FooterContactQueryResult, GalleryListQueryResult, NewsArticleQueryResult, NewsListQueryResult, StoryCategoriesQueryResult, StoryQueryResult, TeamQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];
export type NewsArticle = Exclude<NewsArticleQueryResult, null>;

export type StoryArticle = Exclude<StoryQueryResult, null>;
export type StoryPreview = CatStoriesQueryResult[0];

export type GalleryEvent = GalleryListQueryResult[0];
export type GalleryEventGallery = GalleryEvent['gallery'];
export type GalleryImage = GalleryEventGallery[0];
export type GalleryAsset = Exclude<GalleryImage['asset'], null>;
export type GalleryEventPic = {image: GalleryImage, title?: string, slug?: string, id: string};

export type UdrugaMember = TeamQueryResult[0];

export type FooterInfo = Exclude<FooterContactQueryResult, null>;
export type ContactOtherInfo = FooterInfo['other'][0];

export type StoryCategory = StoryCategoriesQueryResult[0];
export type StoryCategoryDict = {[key: string]: {name: string, color: string}};