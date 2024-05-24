import { Metadata } from "next"
import MainBlock from "@/components/layout/main-bl"
import Main from "@/components/layout/main";
import ShadowedSection from "@/components/ui/section/section";
import ContactForm from "@/components/contact/form";
import blb from '@/components/ui/section/blb.module.css';

export const metadata: Metadata = {
    title: 'Kontakti',
    description: 'Pošaljite Udruzi poruku'
}

export default function Contact() {

    return <Main>
        <MainBlock>
            <h1>Kontakti</h1>
        </MainBlock>

        <ShadowedSection>
            <h4 className={blb.blb}>Kontaktiraj nas!</h4>
            <ContactForm />
        </ShadowedSection>
    </Main>
}