import Link from 'next/link';
import { PortableText } from '@portabletext/react'

import { getLanding, getYearNews } from '@/sanity/lib/fetches';
import { makePics } from '@/utils/serverHelpers';

import NewsGrid from '@/components/news/news-grid';
import NewsItemPreview from '@/components/news/news-prev';
import GalleryGrid from '@/components/gallery/gallery-grid';
import GalleryViewer from '@/components/gallery/gallery-viewer';
import MainBlock from '@/components/layout/main-bl';
import ShadowedSection from '@/components/ui/section/section';

import styles from './index.module.css';
import buble from '@/components/ui/section/blb.module.css';
import leafStyles from '@/styles/leaf.module.css';
import Main from '@/components/layout/main';

export default async function Index() {

  const [landing, news] = await Promise.all([getLanding(), getYearNews()]);

  if (!landing || !news)
    throw new Error('Error fetching landing info');

  return <Main short>
    <MainBlock>
      <div className={styles.hb}>
        <header className={styles.h}>
          <h1>Ahimsa</h1>
          <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
          <h3>Udruga mladih</h3>
        </header>
      </div>
    </MainBlock>

    {landing.text && <>
      <ShadowedSection>
        <h2 className={buble.blb}><Link href="/team">tko smo?</Link></h2>
        <article className={styles.l}>
          <PortableText value={landing.text} />
        </article>
      </ShadowedSection>
    </>}

    <ShadowedSection>
      <h2 className={buble.blb}><Link href="/news">što radimo?</Link></h2>
      <NewsGrid>
        {news.map(item => <NewsItemPreview key={item.slug} item={item} />)}
      </NewsGrid>
    </ShadowedSection>

    {landing.images && landing.images.length > 0 && <>
      <ShadowedSection>
        <h2 className={buble.blb}><Link href="/gallery">kako to izgleda?</Link></h2>
        <GalleryGrid>
          <GalleryViewer pics={makePics(landing.images)} />
        </GalleryGrid>
      </ShadowedSection>
    </>}

    <ShadowedSection>
      <h5 className={buble.blb}>ako nam se želiš pridružiti</h5>
      <h5 className={buble.blb}>ili imaš bilo kakvu ideju</h5>
      <Link href="/contact">
        <div className={`${leafStyles.lfa} ${styles.join}`}>
          <h2>Slobodno nam se javi!</h2>
        </div>
      </Link>
    </ShadowedSection>
  </Main>
}