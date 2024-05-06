import { GalleryListQueryResult, NewsListQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];
export type GalleryEvent = GalleryListQueryResult[0];
export type GalleryEventGallery = GalleryEvent['gallery'];
export type GalleryImage = GalleryEventGallery[0];
export type GalleryAsset = Exclude<GalleryImage['asset'], null>;
export type GalleryEventPic = {id: string, image: GalleryImage, slug?: string, title?: string};