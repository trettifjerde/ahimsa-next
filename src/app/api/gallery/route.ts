import { NextRequest, NextResponse } from "next/server";
import { getYearGallery } from "@/sanity/lib/fetches";
import { GalleryEntryPic as GP } from "@/sanity/lib/types";
import { getYearFetchGroqParams, makeFetcherBody, makeGalleryPics } from "@/utils/serverHelpers";
import { BatchFetcherBody } from "@/utils/types";
import { GALLERY_BATCH_SIZE } from "@/utils/env-fallback";

export async function GET(req: NextRequest) : Promise<NextResponse<BatchFetcherBody<GP>>>{

    const params = getYearFetchGroqParams(GALLERY_BATCH_SIZE, req.nextUrl.searchParams);

    if (params) {
        const entries = await getYearGallery(params);

        if (entries) {
            const fb = makeFetcherBody(entries, GALLERY_BATCH_SIZE);

            return NextResponse.json({
                ...fb,
                items: makeGalleryPics(entries)
            });
        }
    }

    return NextResponse.json({error: 'Invalid params'}, {status: 400});
}