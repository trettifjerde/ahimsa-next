import { NextRequest, NextResponse } from "next/server";
import { getYearGallery } from "@/sanity/lib/fetches";
import { GALLERY_BATCH_SIZE, getListParamsFromURL } from "@/utils/serverHelpers";
import { BatchFetcherResponse as BR } from "@/utils/types";
import { GalleryEvent as GE } from "@/sanity/lib/types";

export async function GET(req: NextRequest) {
    const params = getListParamsFromURL(req.nextUrl.searchParams);

    if (!params)
        return NextResponse.json({error: 'Invalid params'}, {status: 400});

    const entries = await getYearGallery(params);

    if (!entries)
        return NextResponse.json({items: [], hasMore: false} as BR<GE>);

    // const r = await new Promise((res, rej) => {
    //     setTimeout(() => res(1), 5000);
    // })

    return NextResponse.json({items: entries, hasMore: entries.length === GALLERY_BATCH_SIZE} as BR<GE>);

}