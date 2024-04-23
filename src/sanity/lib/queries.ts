import { groq } from "next-sanity";
import { PortableTextBlock } from '@portabletext/types';

export const LANDING_QUERY = groq`*[_type == "landing"][0] { text }`;
export const NEWSLIST_QUERY = groq`*[_type == "news"] | order(date desc) { title, "slug": slug.current, image, date }`;

export type LandingQuery = {text: PortableTextBlock};
export type NewsListQuery = {title: string, slug: string, description: PortableTextBlock, image?: any, date: string};
