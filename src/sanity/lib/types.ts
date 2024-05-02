import { GalleryListQueryResult, NewsListQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];
export type GalleryEvent = GalleryListQueryResult[0];
export type GalleryEventPics = GalleryEvent['gallery'];