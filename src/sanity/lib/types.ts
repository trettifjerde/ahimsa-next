import { ContactQueryResult, GalleryListQueryResult, NewsListQueryResult, TeamQueryResult } from "../../../sanity.types";

export type NewsListPreviewItem = NewsListQueryResult[0];

export type GalleryEvent = GalleryListQueryResult[0];
export type GalleryEventGallery = GalleryEvent['gallery'];
export type GalleryImage = GalleryEventGallery[0];
export type GalleryAsset = Exclude<GalleryImage['asset'], null>;
export type GalleryEventPic = {id: string, image: GalleryImage, slug?: string, title?: string};

export type UdrugaMember = TeamQueryResult[0];

export type FooterInfo = Exclude<ContactQueryResult, null>;
export type ContactOtherInfo = FooterInfo['other'][0];