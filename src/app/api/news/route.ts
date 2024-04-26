import { NextRequest, NextResponse } from "next/server";
import { getYearNews } from "@/sanity/lib/fetches";
import { getNewsListParamsFromURL } from "@/utils/serverHelpers";

export async function GET(req: NextRequest) {
    const params = getNewsListParamsFromURL(req.nextUrl.searchParams);
    console.log('Route Handler params', params);

    if (!params)
        return NextResponse.json({error: 'Invalid params'}, {status: 400});

    const news = await getYearNews(params);

    console.log('Route Handler news', news);

    if (!news)
        return NextResponse.json([])

    return NextResponse.json(news);

}