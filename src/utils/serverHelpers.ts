import { GalleryEvent, GalleryEventGallery, GalleryEventPic } from "@/sanity/lib/types";
import { getEntriesKey } from "./clientHelpers";
import { FetcherEntry } from "./types";
import { getCategoryId } from "@/sanity/lib/fetches";

export const UDRUGA_START_YEAR = parseInt(process.env.NEXT_PUBLIC_UDRUGA_START_YEAR || '2016');

export const UDRUGA_ALL_YEARS = (() => {
    const years : string[] = [];
    const curYear = new Date().getFullYear();
    for (let y = curYear; y >= UDRUGA_START_YEAR; y--) 
        years.push(y.toString());
    return years;
})();
export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');
export const STORIES_BATCH_SIZE = parseInt(process.env.STORIES_BATCH_SIZE || '5');
export const REVALIDATE_TIMEOUT = parseInt(process.env.REVALIDATE_TIMEOUT || '5');

export type GroqStoriesParams = {end: string, batchSize: number, catId?: string};

export async function getGroqStoriesParams(info?: {selectedCat?: string, lastDate?: string}) {
    const {selectedCat, lastDate} = info || {selectedCat: undefined, lastDate: undefined};
    
    const params : GroqStoriesParams = {
        end: lastDate || new Date().toISOString(),
        batchSize: STORIES_BATCH_SIZE
    };

    if (selectedCat) {
        const catId = await getCategoryId(selectedCat);

        if (!catId)
            return undefined;

        params.catId = catId._id;
    }

    return params;
}

export function getGroqStoriesParamsFromUrl(searchParams: URLSearchParams) {
    const lastDate = searchParams.get('lastDate') || undefined;
    const selectedCat = searchParams.get('cat') || undefined;

    return getGroqStoriesParams({ lastDate, selectedCat });
}

export function getGroqNewsParams(info?: { selectedYear: string, lastDate?: string}) {
    return getGroqYearParams(NEWS_BATCH_SIZE, info);
}

export function getGroqNewsParamsFromUrl(searchParams: URLSearchParams) {
    return getGroqYearParamsFromUrl(NEWS_BATCH_SIZE, searchParams);
}

export function getGroqGalleryParamsFromUrl(searchParams: URLSearchParams) {
    return getGroqYearParamsFromUrl(GALLERY_BATCH_SIZE, searchParams);
}

export function getGroqGalleryParams(info?: { selectedYear: string, lastDate?: string}) {
    return getGroqYearParams(GALLERY_BATCH_SIZE, info);
}

export function makePics(gallery: GalleryEventGallery) : GalleryEventPic[] {
    return gallery.map((image, i) => ({
        id: `${i}`,
        image
    }))
}

export function makeGalleryPics(entries: GalleryEvent[]) : GalleryEventPic[] {
    return entries.map(entry => entry.gallery
        .map((image, i) => ({
            image,
            title: entry.title,
            slug: `/${entry._type}/article/${entry.slug}`,
            id: `${entry._type}${entry.slug}${i}`
        }))
    )
    .flat()
}

export function getGalleryFetcherEntry(entries: GalleryEvent[]) : Omit<FetcherEntry<GalleryEventPic>, 'key'> {
    const lastEntry : GalleryEvent | undefined = entries[entries.length - 1];

    return {
        items: makeGalleryPics(entries), 
        hasMore: entries.length === GALLERY_BATCH_SIZE,
        lastDate: lastEntry?.date || '',
    }
}

export function getGroqYearParams(batchSize: number, info?: { selectedYear: string, lastDate?: string }) {

    try {
        const {selectedYear, lastDate} = info || {selectedYear: getEntriesKey(), lastDate: undefined};
        const year = getYearFromKey(selectedYear);

        const start = getStartDate(year);
        const end = getEndDate({ year, lastDate });

        return { start, end, batchSize };
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

function getGroqYearParamsFromUrl(batchSize: number, searchParams: URLSearchParams) {
    try {
        const selectedYear = searchParams.get('year');
        const lastDate = searchParams.get('lastDate');

        // functions is used when fetching more entries, so both params must be provided
        if (!selectedYear)
            throw new Error('Year is undefined');
        if (!lastDate)
            throw new Error('lastDate is undefined');

        return getGroqYearParams(batchSize, { lastDate, selectedYear });
    }
    catch (error) {
        console.log(error);
        return undefined;
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