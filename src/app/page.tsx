import Link from 'next/link';

import Main from '@/components/layout/main';
import ShadowedSection from '@/components/ui/section/section';
import NewsGrid from '@/components/news/news-grid';
import LandingGallery from '@/components/landing/gallery';
import LandingHeader from '@/components/landing/header';
import LandingSummary from '@/components/landing/summary';
import LandingContactButton from '@/components/landing/contact-btn';

import buble from '@/components/ui/section/blb.module.css';

export default async function Index() {

  return <Main short>
    <LandingHeader />

    <ShadowedSection>
      <h2 className={buble.blb}><Link href="/team">tko smo?</Link></h2>
      <LandingSummary />
    </ShadowedSection>

    <ShadowedSection>
      <h2 className={buble.blb}><Link href="/news">što radimo?</Link></h2>
      <NewsGrid />
    </ShadowedSection>

    <ShadowedSection>
      <h2 className={buble.blb}><Link href="/gallery">kako to izgleda?</Link></h2>
      <LandingGallery />
    </ShadowedSection>

    <ShadowedSection>
      <h5 className={buble.blb}>ako nam se želiš pridružiti</h5>
      <h5 className={buble.blb}>ili imaš bilo kakvu ideju</h5>
      <LandingContactButton />
    </ShadowedSection>
  </Main >
}