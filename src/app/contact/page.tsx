import { Metadata } from "next"
import { PortableText } from "@portabletext/react";
import { getContacts } from "@/sanity/lib/fetches";
import MainBlock from "@/components/layout/main-bl"
import Main from "@/components/layout/main";
import ShadowedSection from "@/components/ui/section/section";
import ContactForm from "@/components/contact/form";
import styles from './c.module.css';
import blb from '@/components/ui/section/blb.module.css';
import leafStylef from '@/styles/leaf.module.css';

export const metadata: Metadata = {
    title: 'Kontakti',
    description: 'Pošaljite Udruzi poruku'
}

export default async function Contact() {

    const contactInfo = await getContacts();

    return <Main>
        <MainBlock>
            <h1>Kontakti</h1>

            {contactInfo?.greeting && <div className={`${leafStylef.lf} ${styles.gr}`}>
                <PortableText value={contactInfo.greeting} />     
            </div>}

        </MainBlock>

        <ShadowedSection>
            <h4 className={blb.blb}>Kontaktiraj nas!</h4>
            <ContactForm />
        </ShadowedSection>
    </Main>
}