import { Metadata } from "next"
import { getContactsGreeting } from "@/sanity/lib/fetches";
import MainBlock from "@/components/layout/main-bl"
import Main from "@/components/layout/main";
import ShadowedSection from "@/components/ui/section/section";
import ContactForm from "@/components/contact/form";
import blb from '@/components/ui/section/blb.module.css';
import listItemStyles from '@/styles/list-item.module.css';
import HighlightBlock from "@/components/ui/highlight/highlight";

export const metadata: Metadata = {
    title: 'Kontakti',
    description: 'Pošaljite poruku Udruzi Ahimsa'
}

export default function Contact() {

    const textPromise = getContactsGreeting()
        .then(res => res?.greeting || null)

    return <Main>
        <MainBlock>
            <h1>Kontakti</h1>
            <HighlightBlock textPromise={textPromise}/>
        </MainBlock>

        <ShadowedSection className={listItemStyles.c}>
            <h4 className={blb.blb}>Kontaktiraj nas!</h4>
            <ContactForm />
        </ShadowedSection>
    </Main>
}