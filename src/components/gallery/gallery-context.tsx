'use client';

import { GalleryEntryPic } from "@/sanity/lib/types";
import { createListContext } from "../ui/list/list-context-provider";

const GalleryContext = createListContext<GalleryEntryPic>();

export default GalleryContext;