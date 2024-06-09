import { NextRequest, NextResponse } from "next/server";
import { getYearNews } from "@/sanity/lib/fetches";
import { NewsListPreviewItem as News } from "@/sanity/lib/types";
import { getYearFetchGroqParams, makeFetcherBody } from "@/utils/serverHelpers";
import { BatchFetcherBody } from "@/utils/types";
import { NEWS_BATCH_SIZE } from "@/utils/env-fallback";

export async function GET(req: NextRequest): Promise<NextResponse<BatchFetcherBody<News>>> {
    const params = getYearFetchGroqParams(NEWS_BATCH_SIZE, req.nextUrl.searchParams);

    if (params) {

        const news = await getYearNews(params);

        if (news) 
            return NextResponse.json(makeFetcherBody(news, NEWS_BATCH_SIZE));
        
    }
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
}