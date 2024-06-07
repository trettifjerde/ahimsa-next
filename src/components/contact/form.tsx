'use client'

import { useRef } from "react";
import useForm from "@/hooks/useForm";
import submitContactForm from "@/server-actions/contact";
import { ContactFormErrorLog, validateContactForm } from "@/utils/contact-form-helpers";
import { EMAIL, MESSAGE, MESSAGE_LIMIT } from "@/utils/validators";
import { Input, Textarea } from "../ui/forms";
import { SpinnerButton } from "../ui/buttons";
import styles from '@/components/ui/form.module.css';
import listItemStyles from '@/styles/list-item.module.css';

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const { state, handleSubmit } = useForm<ContactFormErrorLog>(validateContactForm, submitContactForm, formRef);
    const { message, errorLog, pending } = state;


    return <form className={`${styles.f} ${listItemStyles.ci}`} ref={formRef} onSubmit={handleSubmit}>
        <p className={`${styles.p} ${message.isError ? styles.err : ''}`}>{message.text}</p>
        <Input name={EMAIL} type="email" label="Email" error={errorLog?.email}
            required />
        <Textarea name={MESSAGE} label='Vaša poruka' error={errorLog?.info}
            required maxLength={MESSAGE_LIMIT} />
        <div className={styles.btn}>
            <SpinnerButton type='submit' loading={pending}>Pošalji</SpinnerButton>
        </div>
    </form>
}