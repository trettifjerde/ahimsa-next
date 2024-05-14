import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from './form.module.css';

type CustomProps = {label: string, error?: string};
type InputProps = InputHTMLAttributes<HTMLInputElement> & CustomProps;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & CustomProps;

export function Input({ type, name, className, required, label, error }: InputProps) {
    return <div>
        <div className={styles.info}>
            <label htmlFor={name} className={`${styles.lbl} ${className ? className : ''}`}>{label}</label>
            <p className={`${styles.p} ${error ? styles.err : ''}`}>{error}</p>
        </div>
        <input className={`${styles.in} ${error ? styles.err : ''}`} type={type} name={name} id={name} required={required} />
    </div>
}

export function Textarea({ name, required, className, label, error }: TextareaProps) {
    return <div>
        <div className={styles.info}>
            <label htmlFor={name} className={`${styles.lbl} ${className ? className : ''}`}>{label}</label>
            <p className={`${styles.p} ${error ? styles.err : ''}`}>{error}</p>
        </div>
        <textarea name={name} id={name} className={`${styles.ta} ${error ? styles.err : ''}`}required={required} />
    </div>
}