import { MouseEventHandler, ReactNode } from "react";
import styles from './buttons.module.css';

type ButtonProps = {
    type?: 'submit' | 'button', 
    disabled?: boolean,
    className?: string,
    onClick: MouseEventHandler,
    children: ReactNode
};
type SpinnerButtonProps = ButtonProps & {loading: boolean};


export function Button({className, children, type='button', disabled=false, onClick=()=>{}}: ButtonProps) {
    return <button type={type} className={`${styles.b} ${className || ''}`} disabled={disabled} onClick={onClick}>{children}</button>
}

export function SpinnerButton({className, children, type, loading, disabled, onClick}: SpinnerButtonProps) {
    return <span className={`${styles.spb} ${loading? styles.loading: ''} ${className || ''}`}>
        <Button className={className} type={type} disabled={disabled} onClick={onClick}>{children}</Button>
    </span>
}