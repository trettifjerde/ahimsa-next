import MainBlock from "@/components/layout/main-bl"
import { Metadata } from "next"
import buble from '@/components/ui/section/blb.module.css';
import ShadowedSection from "@/components/ui/section/section";
import ContactForm from "@/components/contact/form";

export const metadata: Metadata = {
    title: 'Kontakti',
    description: 'Pošaljite Udruzi poruku'
}

export default function Contact() {

    return <>
        <MainBlock>
            <h1>Kontakti</h1>
        </MainBlock>
        <ShadowedSection>
            <h4 className={buble.blb}>Kontaktiraj nas!</h4>
            <ContactForm />
        </ShadowedSection>
    </>
}