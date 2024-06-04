import { NextRequest, NextResponse } from "next/server";
import { getYearGallery } from "@/sanity/lib/fetches";
import { GalleryEventPic as GP } from "@/sanity/lib/types";
import { getGalleryFetcherEntry, getGroqGalleryParamsFromUrl } from "@/utils/serverHelpers";
import { BatchFetcherResponse } from "@/utils/types";

export async function GET(req: NextRequest) : Promise<NextResponse<{error: string} | BatchFetcherResponse<GP>>> {

    const params = getGroqGalleryParamsFromUrl(req.nextUrl.searchParams);
    
    if (!params)
        return NextResponse.json({error: 'Invalid params'}, {status: 400});

    const entries = await getYearGallery(params);

    if (!entries)
        return NextResponse.json(getGalleryFetcherEntry([]));

    // const r = await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 5000);
    // })

    return NextResponse.json(getGalleryFetcherEntry(entries));
}