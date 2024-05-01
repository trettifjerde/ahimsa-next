import { PortableText } from '@portabletext/react'
import { client } from "@/sanity/lib/client";
import { landingQuery } from "@/sanity/lib/queries";

import styles from './index.module.css';
import { LandingQueryResult } from '../../sanity.types';
import { getYearNews } from '@/sanity/lib/fetches';
import NewsItemPreview from '@/components/news/news-prev';
import { getNewsListQueryParams } from '@/utils/serverHelpers';
import NewsGrid from '@/components/news/news-grid';
import Link from 'next/link';

export default async function Index() {

  const [landing, news] = await Promise.all([client.fetch<LandingQueryResult>(landingQuery), getYearNews(getNewsListQueryParams({})!)]);

  if (!landing || !landing.text || !news)
    throw new Error('Error fetching landing info');

  return <>
    <header className={styles.h}>
      <h1>Ahimsa<span>*</span></h1>
      <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
      <h3>Udruga mladih</h3>
    </header>

    <h2 className={styles.blb}><Link href="/team">tko smo?</Link></h2>
    <section className={styles.s}>
      <article className={styles.l}>
        <PortableText value={landing.text} />
      </article>
    </section>

    <h2 className={styles.blb}><Link href="/news">što radimo?</Link></h2>
    <section className={styles.s}>
      <NewsGrid>
        {news.map(item => <NewsItemPreview key={item._id} item={item} />)}
      </NewsGrid>
    </section>

    <h3 className={styles.blb}>želiš nam se pridružiti?</h3>
    <h3 className={styles.blb}>imaš bilo kakvu ideju?</h3>

    <Link href="/volunteer">
      <div className={styles.join}>
        <h2>Slobodno nam se javi!</h2>
      </div>
    </Link>
  </>
}