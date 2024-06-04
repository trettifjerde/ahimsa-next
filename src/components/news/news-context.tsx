'use client';

import { NewsListPreviewItem as News } from "@/sanity/lib/types";
import { createListContext } from "../ui/list/list-context-provider";

const NewsContext = createListContext<News>();

export default NewsContext;