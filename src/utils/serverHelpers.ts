import { GalleryEvent, GalleryEventGallery } from "@/sanity/lib/types";
import { UDRUGA_START_YEAR } from "./clientHelpers";

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');

export function getListQueryParams({ lastDate, year, lastId = '' }: { lastDate?: string, year?: string, lastId?: string }) {

    const start = getStartDate(year);
    if (start === undefined)
        return undefined;

    const end = getEndDate({ year, lastDate });
    if (!end)
        return undefined;

    const batchSize = NEWS_BATCH_SIZE;

    return { start, end, lastId, batchSize };
}

export type YearListQueryParams = Exclude<ReturnType<typeof getListQueryParams>, null>;

export function getListParamsFromURL(searchParams: URLSearchParams) {
    const lastDate = searchParams.get('lastDate') || undefined;
    const lastId = searchParams.get('lastId') || undefined;
    const year = searchParams.get('year') || undefined;

    // function is used for loading more news, so lastDate and lastId must be known, as some news are already fetched
    if (!lastDate || !lastId)
        return undefined;

    return getListQueryParams({ lastDate, lastId, year });
}

export function makeGalleryPics(entry: GalleryEvent) {
    return entry.gallery.map((image, i) => ({
        image,
        title: entry.title,
        slug: `/${entry._type}/${entry.slug}`,
        id: `${entry._type}${entry.slug}${i}`
    }));
}

export function makePics(gallery: GalleryEventGallery) {
    return gallery.map((image, i) => ({
        id: `${i}`,
        image
    }))
}

function getStartDate(year?: string) {

    if (!year || year === 'all')
        return '';

    if (year.length !== 4)
        return undefined;

    const y = parseInt(year);

    if (y >= UDRUGA_START_YEAR && y <= new Date().getFullYear())
        return `${year}-01-01`;

    return undefined;

}

function getEndDate({ year, lastDate }: { lastDate?: string, year?: string }) {

    if (!lastDate) {

        if (!year || year === 'all')
            return new Date().toISOString().slice(0, 10);

        return new Date(`${year}-12-31`).toISOString().slice(0, 10);
    }

    if (isNaN(new Date(lastDate).getTime()))
        return undefined;

    return lastDate;
}