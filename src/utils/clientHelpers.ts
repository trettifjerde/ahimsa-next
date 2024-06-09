import { GalleryEntryPic, ImageFullInfo } from "@/sanity/lib/types";
import { FetcherEntry } from "./types";

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

export async function fetchGallery(params: URLSearchParams) {
    return await fetchData<FetcherEntry<GalleryEntryPic>>(`/api/gallery?${params.toString()}`);
}

export function getDimens(img: ImageFullInfo, cont: HTMLDivElement | null) {
    console.log(img, cont);
    if (cont && img && img.width && img.height) {
        const coef = Math.max((img.width / cont.offsetWidth), (img.height / (0.75 * window.screen.height)));
        console.log(coef);

        if (coef > 1) 
            return {
                width: Math.round(img.width / coef),
                height: Math.round(img.height / coef)
            }

        return {
            width: img.width,
            height: img.height
        }
    }
    return {width: 0, height: 0};
}