import { GalleryEntry, GalleryEntryPic, NewsEntryGallery } from "@/sanity/lib/types";
import { BatchFetcherBody, FetcherEntryMeta, GroqStoriesParams, GroqYearParams } from "./types";
import { getCategoryId } from "@/sanity/lib/fetches";

export const UDRUGA_START_YEAR = parseInt(process.env.NEXT_PUBLIC_UDRUGA_START_YEAR || '2016');

export const UDRUGA_ALL_YEARS = (() => {
    const years: string[] = [];
    const curYear = new Date().getFullYear();
    for (let y = curYear; y >= UDRUGA_START_YEAR; y--)
        years.push(y.toString());
    return years;
})();

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');
export const STORIES_BATCH_SIZE = parseInt(process.env.STORIES_BATCH_SIZE || '5');
export const REVALIDATE_TIMEOUT = parseInt(process.env.REVALIDATE_TIMEOUT || '5');

export function makeFetcherInitInfo<I extends { date: string }>(items: I[], batchSize: number, key?: string): FetcherEntryMeta {
    const lastItem: I | undefined = items[items.length - 1];

    return {
        key: key || 'all',
        lastDate: (items.length === batchSize && lastItem?.date) || ''
    }
}

export function makeFetcherBody<I extends { date: string }>(items: Array<I>, batchSize: number): BatchFetcherBody<I> {
    const lastItem: I | undefined = items[items.length - 1];
    return {
        lastDate: (items.length === batchSize && lastItem?.date) || '',
        items
    }
}

export function makePics(gallery: NewsEntryGallery) : GalleryEntryPic[] {
    
    return gallery.map((image, i) => {
        return {
            id: `${i}`,
            image
        }
    })
}

export function makeGalleryPics(entries: GalleryEntry[]): GalleryEntryPic[] {
    return entries
        .map(entry => {
            const pics: GalleryEntryPic[] = [];

            if (entry.mainImage) {
                pics.push({
                    image: entry.mainImage,
                    title: entry.title,
                    slug: entry.slug,
                    id: `${entry.slug}-main`
                })
            }
            entry.gallery?.forEach((image, i) => pics.push({
                image,
                title: entry.title,
                slug: entry.slug,
                id: `${entry.slug}${i}`
            }));
            
            return pics;
        })
        .flat()
}

export async function getStoriesPageGroqParams(catName?: string) {

    const params: GroqStoriesParams = {
        end: new Date().toISOString(),
        batchSize: STORIES_BATCH_SIZE
    };

    if (catName) {
        const catId = await getCategoryId(catName);

        if (!catId)
            return undefined;

        params.catId = catId;
    }

    return params;
}

export function getStoriesFetchGroqParams(searchParams: URLSearchParams) {
    const lastDate = searchParams.get('lastDate') || undefined;
    const selectedCat = searchParams.get('catId') || undefined;

    // must be provided
    if (!lastDate)
        return undefined;

    const params: GroqStoriesParams = { end: lastDate, batchSize: STORIES_BATCH_SIZE };

    if (selectedCat)
        params.catId = selectedCat;

    return params;
}

export function getYearPageGroqParams(batchSize: number, selectedYear?: number) {

    const params: GroqYearParams = {
        batchSize,
        end: getYearGroqEndParam(selectedYear),
        start: getYearGroqStartParam(selectedYear)
    };

    return params;
}

export function getYearFetchGroqParams(batchSize: number, searchParams: URLSearchParams) {

    const lastDate = searchParams.get('lastDate');
    const start = searchParams.get('start');

    if (lastDate) {
        const params: GroqYearParams = {
            batchSize,
            end: lastDate,
            start: start || getYearGroqStartParam()
        };

        return params;
    }

    return null;
}

export function getYearFromString(year?: string) {
    if (year && year.length === 4) {
        const y = parseInt(year);

        if (y >= UDRUGA_START_YEAR && y <= new Date().getFullYear())
            return y;
    }
    return undefined;
}

function getYearGroqStartParam(year?: number) {
    return year ? `${year - 1}-12-31T23:59:59` : '';
}

function getYearGroqEndParam(year?: number) {
    return year ? `${year + 1}-01-01T00:00:00` : new Date().toISOString();
}