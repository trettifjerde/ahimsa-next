import { GalleryEvent, GalleryEventGallery, GalleryEventPic } from "@/sanity/lib/types";
import { UDRUGA_START_YEAR } from "./clientHelpers";
import { YearContent } from "./types";

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');
export const REVALIDATE_TIMEOUT = parseInt(process.env.REVALIDATE_TIMEOUT || '5');

export function getGroqBatchParams(info?: { selectedYear?: string, lastDate?: string }) {

    try {
        const {selectedYear, lastDate} = info || {selectedYear: undefined, lastDate: undefined};
        const year = getYearFromKey(selectedYear);

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

export function getGroqBatchParamsFromUrl(searchParams: URLSearchParams) {
    try {
        const lastDate = searchParams.get('lastDate') || undefined;
        const selectedYear = searchParams.get('year') || undefined;

        return getGroqBatchParams({ lastDate, selectedYear });
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

export function makePics(gallery: GalleryEventGallery) {
    return gallery.map((image, i) => ({
        id: `${i}`,
        image,
        title: '',
        slug: '',
    }))
}

export function makeGalleryPics(entries: GalleryEvent[]) {
    return entries.map(entry => entry.gallery
        .map((image, i) => ({
            image,
            title: entry.title,
            slug: `/${entry._type}/${entry.slug}`,
            id: `${entry._type}${entry.slug}${i}`
        }))
    )
    .flat()
}

export function getGalleryYearContent(entries: GalleryEvent[], year: number | null) : YearContent<GalleryEventPic> {
    const lastEntry : GalleryEvent | undefined = entries[entries.length - 1];

    return {
        items: makeGalleryPics(entries), 
        hasMore: entries.length === GALLERY_BATCH_SIZE,
        lastDate: lastEntry?.date || '',
        year
    }
}

function getStartDate(currentYear: ReturnType<typeof getYearFromKey>) {

    if (!currentYear)
        return '';

    return `${currentYear - 1}-12-31T23:59:59`;
}

function getEndDate({ year, lastDate }: { lastDate?: string, year: ReturnType<typeof getYearFromKey> }) {

    if (!lastDate) {

        if (!year)
            return new Date().toISOString();

        return new Date(`${year + 1}-01-01T00:00:00`).toISOString();
    }

    if (isNaN(new Date(lastDate).getTime()))
        throw new Error('Invalid lastDate');

    return lastDate;
}

function getYearFromKey(year?: string) {
    if (!year || year === 'all')
        return null;

    if (year.length !== 4)
        throw new Error('Invalid year');

    const y = parseInt(year);

    if (y >= UDRUGA_START_YEAR && y <= new Date().getFullYear())
        return y;

    throw new Error('Invalid year');
}