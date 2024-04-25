import {PortableText} from '@portabletext/react'
import { client } from "@/sanity/lib/client";
import { landingQuery } from "@/sanity/lib/queries";

import styles from './index.module.css';
import { LandingQueryResult } from '../../sanity.types';

export default async function Index() {
  const landing = await client.fetch<LandingQueryResult>(landingQuery);

  if (!landing || !landing.text)
    throw new Error('Error fetching landing info');

  return <>
    <header className={styles.h}>
      <h1>Ahimsa<span>*</span></h1>
      <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
      <h3>Udruga mladih</h3>
    </header>

    <article className={styles.a}>
       <PortableText value={landing.text} />
    </article>

  </>
}