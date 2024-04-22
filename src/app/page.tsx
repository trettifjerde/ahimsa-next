import { SanityDocument } from "next-sanity";
import {PortableText} from '@portabletext/react'
import { client } from "@/sanity/lib/client";
import Main from "@/components/layout/main";
import styles from './index.module.css';

const LANDING_QUERY = `*[_type == "landing"] {header, text}`;

export default async function Index() {
  const landings = await client.fetch<SanityDocument[]>(LANDING_QUERY);
  const landing = landings[0];

  return <Main className={styles.main}>
    <header>
      <h1>Ahimsa<span>*</span></h1>
      <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
      <h3>Udruga mladih</h3>
    </header>

    <section>
       {landing.header}
       <PortableText value={landing.text} />
    </section>
  </Main>
}