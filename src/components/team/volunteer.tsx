'use client';

import { useRef } from 'react';
import useForm from '@/hooks/useForm';
import volunteer from '@/server-actions/volunteer';
import { EMAIL, INFO, INFO_LIMIT, NAME, NAME_LIMIT, SURNAME, VolunteerFormErrorLog, validateVolunteerForm } from '@/utils/validators';
import { Input, Textarea } from '../ui/forms';
import { SpinnerButton } from '../ui/buttons';
import styles from './form.module.css';
import leafStyles from '@/styles/leaf.module.css';
import formStyles from '@/components/ui/form.module.css';


export default function VolunteerForm() {

    const formRef = useRef<HTMLFormElement>(null);
    const { state, handleSubmit } = useForm<VolunteerFormErrorLog>(validateVolunteerForm, volunteer, formRef);
    const {message, errorLog, pending} = state;

    return <div className={`${leafStyles.lf} ${styles.c}`}>
        <h4>Želiš nam se pridružiti?</h4>

        <form ref={formRef} className={styles.f} onSubmit={handleSubmit}>
            <p className={`${formStyles.p} ${message.isError ? formStyles.err : ''}`}>{message.text}</p>
            <div className={styles.fl}>
                <Input name={NAME} type='text' label="Ime" error={errorLog?.name}
                    required maxLength={NAME_LIMIT}  />
                <Input name={SURNAME} type="text" label="Prezime" error={errorLog?.surname}
                    required maxLength={NAME_LIMIT} />
            </div>
            <Input name={EMAIL} type="email" label="Email" error={errorLog?.email}
                required />
            <Textarea name={INFO} label='Ispričaj malo o sebi' error={errorLog?.info}
            required maxLength={INFO_LIMIT} />
            <div className={styles.btn}>
                <SpinnerButton type='submit' loading={pending}>Pošalji</SpinnerButton>
            </div>
        </form>
    </div>
}