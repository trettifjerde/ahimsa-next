import { MouseEventHandler, ReactNode } from "react";
import styles from './buttons.module.css';
import leafStyles from '@/styles/leaf.module.css';

type ButtonProps = {
    type?: 'submit' | 'button',
    disabled?: boolean,
    className?: string,
    onClick?: MouseEventHandler,
    children: ReactNode,
    isOutlined?: boolean,
    isSmall?: boolean
};

type SpinnerButtonProps = ButtonProps & {loading: boolean};

export function Button({className, isOutlined=false, isSmall=false, children, type='button', disabled=false, onClick}: ButtonProps) {
    const clName = `${styles.b} ${isOutlined ? styles.out : ''} ${isSmall ? styles.sm : ''} ${className || ''}`;
    return <button type={type} className={clName} disabled={disabled} onClick={onClick}>{children}</button>
}

export function SpinnerButton({className, type, children, loading, disabled, onClick}: SpinnerButtonProps) {
    return <span className={`${leafStyles.lfa} ${styles.spb} ${loading? styles.loading: ''} ${className || ''}`}>
        <Button type={type} className={className} disabled={disabled} onClick={onClick}>{children}</Button>
    </span>
}