import { GalleryEvent, GalleryEventGallery } from "@/sanity/lib/types";
import { UDRUGA_START_YEAR } from "./clientHelpers";

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');
export const REVALIDATE_TIMEOUT = parseInt(process.env.REVALIDATE_TIMEOUT || '5');

export function getListQueryParams(info?: { selectedYear?: string, lastDate?: string }) {

    try {
        const {selectedYear, lastDate} = info || {selectedYear: undefined, lastDate: undefined};
        const year = getYear(selectedYear);

        const start = getStartDate(year);
        const end = getEndDate({ year, lastDate });

        const batchSize = NEWS_BATCH_SIZE;

        return { start, end, batchSize, year };
    }
    catch (error) {

        console.log(error);
        return undefined;
    }
}

export type YearListQueryParams = ReturnType<typeof getListQueryParams>;

export function getListParamsFromURL(searchParams: URLSearchParams) {
    try {
        const lastDate = searchParams.get('lastDate') || undefined;
        const selectedYear = searchParams.get('year') || undefined;

        // function is used for loading more news, so lastDate must be known, as some news are already fetched
        if (!lastDate)
            throw new Error('lastDate must be provided');

        return getListQueryParams({ lastDate, selectedYear });
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export function makePics(gallery: GalleryEventGallery) {
    return gallery.map((image, i) => ({
        id: `${i}`,
        image,
        title: '',
        slug: '',
        date: ''
    }))
}

function getStartDate(currentYear: ReturnType<typeof getYear>) {

    if (!currentYear)
        return '';

    return `${currentYear - 1}-12-31T23:59:59`;
}

function getEndDate({ year, lastDate }: { lastDate?: string, year: ReturnType<typeof getYear> }) {

    if (!lastDate) {

        if (!year)
            return new Date().toISOString();

        return new Date(`${year + 1}-01-01T00:00:00`).toISOString();
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