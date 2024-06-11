import imageBuilder from "@/sanity/lib/image";
import { ImageInfo } from "@/sanity/lib/types";

type Img = Exclude<ImageInfo, null>

type Props = {
    source: Img,
    full: boolean,
    width?: number
    quality?: number,
    square?: boolean
}

export default function getSanityImageUrl({ source, full, quality=95, width, square }: Props) {

    let b = imageBuilder?.image((full && source._ref) ? source._ref : source)
        .auto('format')
        .quality(quality)
        .fit(full ? 'max' : 'crop')
    
    if (width) {

        b = b.width(width);

        if (square)
            b = b.height(width)
    }

    return b.url()
}