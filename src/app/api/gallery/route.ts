import { NextRequest, NextResponse } from "next/server";
import { getYearGallery } from "@/sanity/lib/fetches";
import { GalleryEventPic as GP } from "@/sanity/lib/types";
import { getGalleryYearContent, getGroqBatchParamsFromUrl } from "@/utils/serverHelpers";
import { YearContent } from "@/utils/types";

export async function GET(req: NextRequest) : Promise<NextResponse<{error: string} | YearContent<GP>>> {

    const params = getGroqBatchParamsFromUrl(req.nextUrl.searchParams);
    
    if (!params)
        return NextResponse.json({error: 'Invalid params'}, {status: 400});

    const entries = await getYearGallery(params);

    if (!entries)
        return NextResponse.json(getGalleryYearContent([], params.year));

    // const r = await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 5000);
    // })

    return NextResponse.json(getGalleryYearContent(entries, params.year));
}