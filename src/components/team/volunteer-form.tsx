'use client';

import { useRef } from 'react';
import useForm from '@/hooks/useForm';
import volunteer from '@/server-actions/volunteer';
import { VolunteerFormErrorLog, validateVolunteerForm } from '@/utils/volunteer-form-helpers';
import { EMAIL, MESSAGE, MESSAGE_LIMIT, NAME, NAME_LIMIT, SURNAME } from '@/utils/validators';
import { Input, Textarea } from '../ui/forms';
import { SpinnerButton } from '../ui/buttons';
import ShadowedSection from '../ui/section/section';
import styles from '@/components/ui/form.module.css';
import buble from '@/components/ui/section/blb.module.css';

export default function VolunteerForm() {

    const formRef = useRef<HTMLFormElement>(null);
    const { state, handleSubmit } = useForm<VolunteerFormErrorLog>(validateVolunteerForm, volunteer, formRef);
    const { message, errorLog, pending } = state;

    return <ShadowedSection reverse>
        <h4 className={buble.blb}>Želiš nam se pridružiti?</h4>

        <form ref={formRef} className={styles.f} onSubmit={handleSubmit}>
            <p className={`${styles.p} ${message.isError ? styles.err : ''}`}>{message.text}</p>
            <div className={styles.fl}>
                <Input name={NAME} type='text' label="Ime" error={errorLog?.name}
                    required maxLength={NAME_LIMIT} />
                <Input name={SURNAME} type="text" label="Prezime" error={errorLog?.surname}
                    required maxLength={NAME_LIMIT} />
            </div>
            <Input name={EMAIL} type="email" label="Email" error={errorLog?.email}
                required />
            <Textarea name={MESSAGE} label='Ispričaj malo o sebi' error={errorLog?.info}
                required maxLength={MESSAGE_LIMIT} />
            <div className={styles.btn}>
                <SpinnerButton type='submit' loading={pending}>Pošalji</SpinnerButton>
            </div>
        </form>
    </ShadowedSection>
}