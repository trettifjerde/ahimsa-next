import { NextRequest, NextResponse } from "next/server";
import { getYearGallery } from "@/sanity/lib/fetches";
import { getListParamsFromURL } from "@/utils/serverHelpers";

export async function GET(req: NextRequest) {
    const params = getListParamsFromURL(req.nextUrl.searchParams);

    if (!params)
        return NextResponse.json({error: 'Invalid params'}, {status: 400});

    const news = await getYearGallery(params);

    if (!news)
        return NextResponse.json([])

    return NextResponse.json(news);

}