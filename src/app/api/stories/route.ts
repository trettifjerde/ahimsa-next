import { getStories } from "@/sanity/lib/fetches";
import { StoryPreview } from "@/sanity/lib/types";
import { STORIES_BATCH_SIZE, getStoriesFetchGroqParams, makeFetcherBody } from "@/utils/serverHelpers";
import { BatchFetcherBody } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) : Promise<NextResponse<BatchFetcherBody<StoryPreview>>> {
    const params = getStoriesFetchGroqParams(req.nextUrl.searchParams);

    if (params) {
        const items = await getStories(params);

        if (items) 
            return NextResponse.json(makeFetcherBody(items, STORIES_BATCH_SIZE));
    }

    return NextResponse.json({error: 'Invalid params'}, {status: 400});
}