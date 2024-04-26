import { GetYearNewsParams } from "@/sanity/lib/query-params";

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const UDRUGA_START_YEAR = parseInt(process.env.UDRUGA_START_YEAR || '2016');

function getEndYear(year?: string) {

    if (!year)
        return '';

    if (year.length !== 4)
        return null;

    const y = parseInt(year);

    if (y >= UDRUGA_START_YEAR && y <= new Date().getFullYear())
        return `${year}-01-01`;

    return null;

}

function getStartDate({year, lastDate}: {lastDate?: string, year?: string}) {

    if (!lastDate) {

        if (!year)
            return new Date().toISOString().slice(0, 10);

        return new Date(`${year}-12-31`).toISOString().slice(0, 10);
    }

    if (isNaN(new Date(lastDate).getTime()))
        return null;

    return lastDate;
}

export function getNewsListQueryParams({ lastDate, year, lastId = '' }: { lastDate?: string, year?: string, lastId?: string }) {
    
    const end = getEndYear(year);
    if (end === null)
        return null;

    const start = getStartDate({year, lastDate});
    if (!start)
        return null;
    
    const batchSize = NEWS_BATCH_SIZE;

    return { start, end, lastId, batchSize };
}

export function getNewsListParamsFromURL(searchParams: URLSearchParams) {
    const lastDate = searchParams.get('lastDate') || undefined;
    const lastId = searchParams.get('lastId') || undefined;
    const year = searchParams.get('year') || undefined;

    // function is used for loading more news, so lastDate and lastId must be known, as some news are already fetched
    if (!lastDate || !lastId)
        return null;

    return getNewsListQueryParams({lastDate, lastId, year});
}