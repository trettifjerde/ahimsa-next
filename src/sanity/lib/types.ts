import { GalleryListQueryResult, NewsListQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];
export type GalleryEvent = GalleryListQueryResult[0];
export type GalleryEventImage = GalleryEvent['gallery'][0];
export type GalleryEventPic = {id: string, image: GalleryEventImage, slug: string, title: string};