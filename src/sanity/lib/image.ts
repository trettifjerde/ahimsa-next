import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { GalleryAsset } from './types'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max').url();
}

export const urlForFullImage = (source: GalleryAsset) => {
  return imageBuilder?.image(source).auto('format').fit('max').url();
}
