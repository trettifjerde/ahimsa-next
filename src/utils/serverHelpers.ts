import { GalleryEvent, GalleryEventGallery } from "@/sanity/lib/types";
import { UDRUGA_START_YEAR } from "./clientHelpers";

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');
export const REVALIDATE_TIMEOUT = parseInt(process.env.REVALIDATE_TIMEOUT || '5');

export function getListQueryParams({ lastDate, year }: { lastDate?: string, year?: string }) {

    try {
        const currentYear = getYear(year);

        const start = getStartDate(currentYear);
        const end = getEndDate({ currentYear, lastDate });

        const batchSize = NEWS_BATCH_SIZE;

        return { start, end, batchSize };
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export type YearListQueryParams = Exclude<ReturnType<typeof getListQueryParams>, null>;

export function getListParamsFromURL(searchParams: URLSearchParams) {
    try {
        const lastDate = searchParams.get('lastDate') || undefined;
        const year = searchParams.get('year') || undefined;

        // function is used for loading more news, so lastDate must be known, as some news are already fetched
        if (!lastDate)
            throw new Error('lastDate must be provided');

        return getListQueryParams({ lastDate, year });
    }
    catch (error) {
        console.log(error);
        return null;
    }
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
        image,
        title: '',
        slug: ''
    }))
}

function getStartDate(currentYear: ReturnType<typeof getYear>) {

    if (!currentYear)
        return '';

    return `${currentYear - 1}-12-31T23:59:59`;
}

function getEndDate({ currentYear, lastDate }: { lastDate?: string, currentYear: ReturnType<typeof getYear> }) {

    if (!lastDate) {

        if (!currentYear)
            return new Date().toISOString();

        return new Date(`${currentYear + 1}-01-01T00:00:00`).toISOString();
    }

    if (isNaN(new Date(lastDate).getTime()))
        throw new Error('Invalid lastDate');

    return lastDate;
}

function getYear(year?: string) {
    if (!year || year === 'all')
        return null;

    if (year.length !== 4)
        throw new Error('Invalid year');

    const y = parseInt(year);

    if (y >= UDRUGA_START_YEAR && y <= new Date().getFullYear())
        return y;

    throw new Error('Invalid year');
}