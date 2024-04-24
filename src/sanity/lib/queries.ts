import { groq } from "next-sanity";

export const landingQuery = groq`*[_type == "landing"][0] { text }`;
export const newsListQuery = groq`*[_type == "news" && defined(slug.current)] | order(date desc) { 
    title, 
    "slug": slug.current, 
    "image": image.asset -> url, 
    date, 
    excerpt
}`;
export const newsArticleQuery = groq`*[_type == "news" && slug.current == $slug][0] { 
    title, 
    "image": image.asset -> url, 
    date, 
    description 
}`;