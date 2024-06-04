import { groq } from "next-sanity";

export const landingQuery = groq`*[_type == "landing"][0] 
{ 
    text, 
    "images": images[] { asset, crop, hotspot }
}`;

export const newsListQuery = groq`
    *[_type == "news" && date < $end && date > $start] 
    | order(date desc) 
    [0...$batchSize] 
    { 
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
        "image": mainImage { 
            asset, 
            crop, 
            hotspot, 
            "aspectRatio": asset -> metadata.dimensions.aspectRatio 
        }, 
        date, 
        description,
        excerpt,
        "gallery": gallery[]{ asset, crop, hotspot}
    }`;

export const galleryListQuery = groq`
    *[_type == "news" && defined(gallery) && date < $end && date > $start] 
    | order(date desc) 
    [0...$batchSize] 
    {
        _type,
        title,
        date,
        "slug": slug.current,
        "gallery": gallery[] { 
            asset, 
            hotspot, 
            crop
        }
}`;

export const teamQuery = groq`
    *[_type == "member"]
    | order(name asc)
    {
        name,
        surname,
        description,
        "image": image { asset, crop, hotspot }
    }
`;

export const footerContactQuery = groq`
    *[_type == "contacts"][0] {
        email,
        address,
        phone,
        facebook,
        instagram,
        other
    }
`;

export const contactQuery = groq`
    *[_type == "contacts"][0] {
        greeting
}
`;

export const uncatStoriesQuery = groq`
    *[_type == "story" && date < $end] 
    | order(date desc) 
    [0...$batchSize] 
    { 
        title, 
        "slug": slug.current, 
        "image": mainImage { asset, crop, hotspot },
        "categories": categories[] { _ref },
        date, 
        excerpt
}`;

export const catStoriesQuery = groq`
    *[_type == "story" && $catId in categories && date < $end] 
    | order(date desc) 
    [0...$batchSize] 
    { 
        title, 
        "slug": slug.current, 
        "image": mainImage { asset, crop, hotspot },
        "categories": categories[] { _ref },
        date, 
        excerpt
}`;

export const storyQuery = groq`
    *[_type == "story" && slug.current == $slug]
    [0] 
    { 
        title, 
        "image": mainImage { 
            asset, 
            crop, 
            hotspot, 
            "aspectRatio": asset -> metadata.dimensions.aspectRatio 
        }, 
        date, 
        description,
        excerpt,
        "gallery": gallery[] { asset, crop, hotspot},
        "categories": categories[] { _ref }
    }`;

export const storyCategoriesQuery = groq`
    *[_type == "storyCategory"] {
        _id,
        "name": name.current,
        "color": color.rgb { r, g, b }
    }
`;