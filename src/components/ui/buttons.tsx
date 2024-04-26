import { MouseEventHandler, ReactNode } from "react";
import styles from './buttons.module.css';

type ButtonProps = {
    type?: 'submit' | 'button', 
    disabled?: boolean,
    onClick: MouseEventHandler,
    children: ReactNode
};
type SpinnerButtonProps = ButtonProps & {loading: boolean};


export function Button({children, type='button', disabled=false, onClick=()=>{}}: ButtonProps) {
    return <button type={type} className={styles.b} disabled={disabled} onClick={onClick}>{children}</button>
}

export function SpinnerButton({children, type, loading, disabled, onClick}: SpinnerButtonProps) {
    return <span className={`${styles.spb} ${loading? styles.loading: ''}`}>
        <Button type={type} disabled={disabled} onClick={onClick}>{children}</Button>
    </span>
}