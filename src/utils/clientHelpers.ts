import { GalleryEvent } from "@/sanity/lib/types";

export const UDRUGA_START_YEAR = parseInt(process.env.NEXT_PUBLIC_UDRUGA_START_YEAR || '2016');

export const UDRUGA_ALL_YEARS = (() => {
    const years : number[] = [];
    const curYear = new Date().getFullYear();
    for (let y = curYear; y >= UDRUGA_START_YEAR; y--) 
        years.push(y);
    return years;
})();

export async function fetchData<T>(url: string, init?: RequestInit) : Promise<{data: T, failed: false} | {data: string, failed: true}>{
    
    return fetch(new URL(url, process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'), init)
        .then(res => Promise.all([res.json(), Promise.resolve(res.status)]))
        .then(([data, status]) => {
            if (status === 200)
                return {data, failed: false};

            console.log('Error while fetching', status, data);

            throw new Error(data.error);
        })
        .catch(err => {

            if (err.message && typeof(err.message) === 'string')
                return {data: err.message, failed: true};

            return {data: 'Došlo je do pogreške', failed: true};
        })
}


export function getYearStateKey(year: number | null) {
    return year === null ? 'all' : year.toString();
}

export function makeGalleryPics(entries: GalleryEvent[]) {
    return entries.map(entry => entry.gallery
        .map((image, i) => ({
            image,
            title: entry.title,
            slug: `/${entry._type}/${entry.slug}`,
            date: entry.date,
            id: `${entry._type}${entry.slug}${i}`
        }))
    )
    .flat()
}