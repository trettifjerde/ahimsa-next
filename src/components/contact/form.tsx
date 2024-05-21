'use client'

import { useRef } from "react";
import useForm from "@/hooks/useForm";
import submitContactForm from "@/server-actions/contact";
import { ContactFormErrorLog, validateContactForm } from "@/utils/contact-form-helpers";
import { Input, Textarea } from "../ui/forms";
import { SpinnerButton } from "../ui/buttons";
import formStyles from '@/components/ui/form.module.css';
import { EMAIL, MESSAGE, MESSAGE_LIMIT } from "@/utils/validators";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const { state, handleSubmit } = useForm<ContactFormErrorLog>(validateContactForm, submitContactForm, formRef);
    const { message, errorLog, pending } = state;


    return <form ref={formRef} onSubmit={handleSubmit}>
        <p className={`${formStyles.p} ${message.isError ? formStyles.err : ''}`}>{message.text}</p>
        <Input name={EMAIL} type="email" label="Email" error={errorLog?.email}
            required />
        <Textarea name={MESSAGE} label='Vaša poruka' error={errorLog?.info}
            required maxLength={MESSAGE_LIMIT} />
        <div>
            <SpinnerButton type='submit' loading={pending}>Pošalji</SpinnerButton>
        </div>
    </form>
}