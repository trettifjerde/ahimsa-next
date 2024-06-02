import { NextRequest, NextResponse } from "next/server";
import { BatchFetcherResponse as BR } from "@/utils/types";
import { getYearNews } from "@/sanity/lib/fetches";
import { NewsListPreviewItem as News } from "@/sanity/lib/types";
import { NEWS_BATCH_SIZE, getListParamsFromURL } from "@/utils/serverHelpers";

export async function GET(req: NextRequest) {
    const params = getListParamsFromURL(req.nextUrl.searchParams);

    if (!params)
        return NextResponse.json({error: 'Invalid params'}, {status: 400});

    const news = await getYearNews(params);

    if (!news)
        return NextResponse.json({items: [], hasMore: false} as BR<News>);

    return NextResponse.json({items: news, hasMore: news.length === NEWS_BATCH_SIZE} as BR<News>);

}