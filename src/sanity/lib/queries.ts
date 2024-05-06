import { groq } from "next-sanity";

export const landingQuery = groq`*[_type == "landing"][0] 
{ 
    text, 
    "images": images[] { asset, crop, hotspot }
}`;

export const newsListQuery = groq`
    *[_type == "news" && date <= $end && date >= $start && _id > $lastId] 
    | order(date desc) 
    [0...$batchSize] 
    { 
        _id,
        title, 
        "slug": slug.current, 
        "image": mainImage { asset, crop, hotspot },
        date, 
        excerpt
    }`;

export const newsArticleQuery = groq`
    *[_type == "news" && slug.current == $slug]
    [0] 
    { 
        title, 
        "image": mainImage.asset -> url, 
        date, 
        description,
        "gallery": gallery[]{ asset, crop, hotspot}
    }`;

export const galleryListQuery = groq`
    *[_type == "news" && defined(gallery) && date <= $end && date >= $start && _id > $lastId] 
    | order(date desc) 
    [0...$batchSize] 
    {
        _id,
        _type,
        title,
        date,
        "slug": slug.current,
        "gallery": gallery[] { asset, hotspot, crop }
}`;