import Link from 'next/link';
import { PortableText } from '@portabletext/react'

import { getLanding, getYearNews } from '@/sanity/lib/fetches';
import { makePics } from '@/utils/serverHelpers';

import IndexSection from '@/components/index/section';
import NewsGrid from '@/components/news/news-grid';
import NewsItemPreview from '@/components/news/news-prev';
import GalleryGrid from '@/components/gallery/gallery-grid';
import GalleryViewer from '@/components/gallery/gallery-viewer';

import styles from './index.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default async function Index() {

  const [landing, news] = await Promise.all([getLanding(), getYearNews()]);

  if (!landing || !news)
    throw new Error('Error fetching landing info');

  return <>
    <header className={styles.h}>
      <h1>Ahimsa<span>*</span></h1>
      <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
      <h3>Udruga mladih</h3>
    </header>

    {landing.text && <>
      <IndexSection>
        <h2 className={styles.blb}><Link href="/team">tko smo?</Link></h2>
        <article className={styles.l}>
          <PortableText value={landing.text} />
        </article>
      </IndexSection>
    </>}

    <IndexSection>
      <h2 className={styles.blb}><Link href="/news">što radimo?</Link></h2>
      <NewsGrid>
        {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}
      </NewsGrid>
      </IndexSection>

    {landing.images && landing.images.length > 0 && <>
      <IndexSection>
        <h2 className={styles.blb}><Link href="/gallery">kako to izgleda?</Link></h2>
        <GalleryGrid>
          <GalleryViewer pics={makePics(landing.images)} />
        </GalleryGrid>
      </IndexSection>
    </>}


    <IndexSection>
      <h5 className={styles.blb}>ako nam se želiš pridružiti</h5>
      <h5 className={styles.blb}>ili imaš bilo kakvu ideju</h5>
      <Link href="/volunteer">
        <div className={`${leafStyles.lfa} ${styles.join}`}>
          <h2>Slobodno nam se javi!</h2>
        </div>
      </Link>
    </IndexSection>
  </>
}