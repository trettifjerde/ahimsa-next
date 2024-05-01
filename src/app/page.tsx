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

    <section className={styles.s}>
      <Link href="/team"><h2>tko smo?</h2></Link>
      <article className={styles.l}>
        <PortableText value={landing.text} />
      </article>
    </section>

    <section className={styles.s}>
      <Link href="/news"><h2>što radimo?</h2></Link>
      <NewsGrid>
        {news.map(item => <NewsItemPreview key={item._id} item={item} />)}
      </NewsGrid>
    </section>

    <section className={styles.s}>
      <Link href="/volunteer">
        <div className={styles.join}>
          <h5>Pridruži nam se</h5>
        </div>
      </Link>
    </section>

  </>
}