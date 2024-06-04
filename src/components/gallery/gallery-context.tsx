'use client'
import { GalleryEventPic } from "@/sanity/lib/types";
import { createListContext } from "../ui/list/list-context-provider";

const GalleryContext = createListContext<GalleryEventPic>();

export default GalleryContext;