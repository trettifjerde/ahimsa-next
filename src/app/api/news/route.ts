import { NextRequest, NextResponse } from "next/server";
import { getYearNews } from "@/sanity/lib/fetches";
import { NewsListPreviewItem as News } from "@/sanity/lib/types";
import { NEWS_BATCH_SIZE, getGroqBatchParamsFromUrl } from "@/utils/serverHelpers";
import { YearContent } from "@/utils/types";

export async function GET(req: NextRequest): Promise<NextResponse<{ error: string } | YearContent<News>>> {
    const params = getGroqBatchParamsFromUrl(req.nextUrl.searchParams);

    if (!params)
        return NextResponse.json({ error: 'Invalid params' }, { status: 400 });

    const news = await getYearNews(params);

    if (!news)
        return NextResponse.json({
            items: [], 
            hasMore: false, 
            lastDate: '', 
            year: params.year
        });

    const lastNews: News | undefined = news[news.length - 1];

    return NextResponse.json({
        items: news,
        hasMore: news.length === NEWS_BATCH_SIZE,
        lastDate: lastNews?.date || '',
        year: params.year
    });

}