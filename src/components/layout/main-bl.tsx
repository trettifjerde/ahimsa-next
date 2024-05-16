import { ReactNode } from "react";
import styles from './mbl.module.css'

export default function MainBlock({className, children}: {className?: string, children: ReactNode}) {
    return <div className={`${styles.m} ${className ? className : ''}`}>
        {children}
    </div>
}