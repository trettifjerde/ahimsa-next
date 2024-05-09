import { PortableText } from '@portabletext/react'
import { client } from "@/sanity/lib/client";
import { landingQuery } from "@/sanity/lib/queries";

import styles from './index.module.css';
import { LandingQueryResult } from '../../sanity.types';
import { getYearNews } from '@/sanity/lib/fetches';
import NewsItemPreview from '@/components/news/news-prev';
import { getListQueryParams, makePics } from '@/utils/serverHelpers';
import Link from 'next/link';
import NewsGrid from '@/components/news/news-grid';
import GalleryGrid from '@/components/gallery/gallery-grid';
import GalleryViewer from '@/components/gallery/gallery-viewer';

export default async function Index() {

  const [landing, news] = await Promise.all([client.fetch<LandingQueryResult>(landingQuery), getYearNews(getListQueryParams({})!)]);

  if (!landing || !news)
    throw new Error('Error fetching landing info');

  return <>
    <header className={styles.h}>
      <h1>Ahimsa<span>*</span></h1>
      <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
      <h3>Udruga mladih</h3>
    </header>

    {landing.text && <>
      <section className={styles.s}>
      <h2 className={styles.blb}><Link href="/team">tko smo?</Link></h2>
        <article className={styles.l}>
          <PortableText value={landing.text} />
        </article>
      </section>
    </>}

    <section className={styles.s}>
    <h2 className={styles.blb}><Link href="/news">što radimo?</Link></h2>
      <NewsGrid>
        {news.map(item => <NewsItemPreview key={item._id} item={item} />)}
      </NewsGrid>
    </section>

    {landing.images && landing.images.length > 0 && <>
      <section className={styles.s}>
      <h2 className={styles.blb}><Link href="/gallery">kako to izgleda?</Link></h2>
        <GalleryGrid>
          <GalleryViewer pics={makePics(landing.images)} />
        </GalleryGrid>
      </section>
    </>}


    <section className={styles.s}>
    <h5 className={styles.blb}>ako nam se želiš pridružiti</h5>
    <h5 className={styles.blb}>ili imaš bilo kakvu ideju</h5>
      <Link href="/volunteer">
        <div className={styles.join}>
          <h2>Slobodno nam se javi!</h2>
        </div>
      </Link>
    </section>

  </>
}