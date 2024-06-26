import { groq } from "next-sanity";

export const landingQuery = groq`*[_type == "landing"][0] 
{ 
    text, 
    "images": images[] { 
        "_ref": asset._ref, 
        crop, 
        hotspot,
        ...(
            asset -> metadata {
                "width": dimensions.width,
                "height": dimensions.height,
                lqip
            }
        ) 
    }
}`;

export const newsListQuery = groq`
    *[_type == "news" && date < $end && date > $start] 
    | order(date desc) 
    [0...$batchSize] 
    { 
        title, 
        "slug": slug.current, 
        "image": mainImage.image { 
            "_ref": asset._ref, 
            crop, 
            hotspot,
            "lqip": asset -> metadata.lqip 
        },
        date, 
        excerpt
    }`;

export const newsArticleQuery = groq`
    *[_type == "news" && slug.current == $slug]
    [0] 
    { 
        title, 
        "image": mainImage.image {
            "_ref": asset._ref, 
            crop, 
            hotspot, 
            ...(
                asset -> metadata {
                    "width": dimensions.width,
                    "height": dimensions.height,
                    lqip
                }
            )
        }, 
        date, 
        description,
        excerpt,
        "gallery": gallery[].image { 
            "_ref": asset._ref, 
            crop, 
            hotspot,
            ...(
                asset -> metadata {
                    "width": dimensions.width,
                    "height": dimensions.height,
                    lqip
                }
            ) 
        }
    }`;

export const galleryListQuery = groq`
    *[_type in ["news", "story"] && (mainImage.isGalleryImage || count(gallery[isGalleryImage]) > 0) && date < $end && date > $start] 
    | order(date desc) 
    [0...$batchSize] 
    {
        "slug": "/" + _type + "/article/" + slug.current,
        title,
        date,
        "mainImage": mainImage.image {
            "_ref": asset._ref, 
            crop, 
            hotspot,
            ...(
                asset -> metadata {
                    "width": dimensions.width,
                    "height": dimensions.height,
                    lqip
                }
            )
        },
        "gallery": gallery[isGalleryImage].image { 
            "_ref": asset._ref, 
            hotspot, 
            crop,
            ...(
                asset -> metadata {
                    "width": dimensions.width,
                    "height": dimensions.height,
                    lqip
                }
            )
        }
}`;

export const teamQuery = groq`
    *[_type == "member"]
    | order(surname asc)
    {
        name,
        surname,
        description,
        "image": image { 
            "_ref": asset._ref, 
            crop, 
            hotspot,
            "lqip": asset -> metadata.lqip
        }
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
        "image": mainImage.image { 
            "_ref": asset._ref, 
            crop, 
            hotspot,
            "lqip": asset -> metadata.lqip
        },
        "categories": categories[]._ref,
        date, 
        excerpt
}`;

export const catStoriesQuery = groq`
    *[_type == "story" && references($catId) && date < $end] 
    | order(date desc) 
    [0...$batchSize] 
    { 
        title, 
        "slug": slug.current, 
        "image": mainImage.image { 
            "_ref": asset._ref, 
            crop, 
            hotspot,
            "lqip": asset -> metadata.lqip 
        },
        "categories": categories[]._ref,
        date, 
        excerpt
}`;

export const storyQuery = groq`
    *[_type == "story" && slug.current == $slug]
    [0] 
    { 
        title, 
        "image": mainImage.image { 
            "_ref": asset._ref, 
            crop, 
            hotspot, 
            ...(asset -> metadata {
                "width": dimensions.width,
                "height": dimensions.height,
                lqip
            })
        }, 
        date, 
        description,
        excerpt,
        "gallery": gallery[].image { 
            "_ref": asset._ref, 
            crop, 
            hotspot,
            ...(
                asset -> metadata {
                    "width": dimensions.width,
                    "height": dimensions.height,
                    lqip
                }
            ) 
        },
        "categories": categories[]._ref
    }`;

export const storyCategoriesQuery = groq`
    *[_type == "storyCategory"] {
        _id,
        "name": name.current,
        "slug": slug.current,
        "color": color.rgb { r, g, b }
    }
`;

export const categoryByIdQuery = groq`
    *[_type == "storyCategory" && slug.current == $slug][0]{ _id, "name": name.current }
`;