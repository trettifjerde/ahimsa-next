import { NextRequest, NextResponse } from "next/server";
import { getYearNews } from "@/sanity/lib/fetches";
import { NewsListPreviewItem as News } from "@/sanity/lib/types";
import { NEWS_BATCH_SIZE, getGroqNewsParamsFromUrl } from "@/utils/serverHelpers";
import { BatchFetcherResponse } from "@/utils/types";

export async function GET(req: NextRequest): Promise<NextResponse<{ error: string } | BatchFetcherResponse<News>>> {
    const params = getGroqNewsParamsFromUrl(req.nextUrl.searchParams);

    if (!params)
        return NextResponse.json({ error: 'Invalid params' }, { status: 400 });

    const news = await getYearNews(params);

    if (!news)
        return NextResponse.json({
            items: [], 
            hasMore: false, 
            lastDate: ''
        });

    const lastNews: News | undefined = news[news.length - 1];

    return NextResponse.json({
        items: news,
        hasMore: news.length === NEWS_BATCH_SIZE,
        lastDate: lastNews?.date || '',
    });

}