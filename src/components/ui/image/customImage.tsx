'use client';

import Image, { ImageProps } from "next/image";
import { AnyImageInfo } from "@/sanity/lib/types";
import logo from '@/styles/logo.svg';
import getSanityImageUrl from "@/utils/image-loader";

type Props = Omit<ImageProps, 'src' | 'alt' | 'fill' | 'placeholder' | 'blurDataURL' | 'className'> & {
    source: AnyImageInfo,
    full?: boolean,
    square?: boolean
};

export default function CustomImage({ source, full = false, square, ...props }: Props) {

    if (source) {

        if (props.width && props.height)
            return  <Image src={getSanityImageUrl({ source, full })} alt=""
                    placeholder="blur" blurDataURL={source.lqip || ''}
                    {...props}
                />

        return <Image src="meow" alt="" fill {...props} placeholder="blur" blurDataURL={source.lqip || ''}
            loader={({ width, quality }) => getSanityImageUrl({ source, full, width, quality, square })} />
    }

    return <Image src={logo} alt="" {...props} style={{ width: '100%', height: '100%' }} />
}