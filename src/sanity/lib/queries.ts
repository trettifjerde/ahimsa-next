import { groq } from "next-sanity";

const newListQ = `
    *[_type == "news" && date <= $lastDate && _id > $lastId && date >= $limit] 
    | order(date desc) 
    [0...${process.env.NEWS_BATCH_SIZE || 10}] 
    { 
        _id,
        title, 
        "slug": slug.current, 
        "image": image.asset -> url, 
        date, 
        excerpt
    }`

export const landingQuery = groq`*[_type == "landing"][0] { text }`;
export const newsListQuery = groq`
*[_type == "news" && date <= $lastDate && _id > $lastId && date >= $limit] 
| order(date desc) 
[0...$batchSize] 
{ 
    _id,
    title, 
    "slug": slug.current, 
    "image": image.asset -> url, 
    date, 
    excerpt
}`;
export const newsArticleQuery = groq`
    *[_type == "news" && slug.current == $slug]
    [0] 
    { 
        title, 
        "image": image.asset -> url, 
        date, 
        description 
    }`;