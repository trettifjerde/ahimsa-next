import styles from './news-link.module.css'
import { ReactNode } from "react";

export default function NewsLink({children, active, onClick}: {children: ReactNode, active: boolean, onClick: () => void}) {

    return <li className={`${styles.li} ${active ? 'active' : ''}`} onClick={onClick}>
        {children}
    </li>
}