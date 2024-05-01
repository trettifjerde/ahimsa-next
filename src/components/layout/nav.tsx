'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
import styles from './nav.module.css';
import menuStyles from '@/styles/menu.module.css';

export default function Navigation() {
    const pathname = usePathname();

    return <nav>
        <div className="nav-inner">
            <Link href="/" className="logo-c">
                <Logo />
            </Link>
            <ul className={`${menuStyles.menu} ${menuStyles.notrans} ${styles.menu}`}>
                {paths.map(p => <Link key={p.url} href={p.url}>
                    <li className={p.url === pathname ? menuStyles.active : ''}>{p.text}</li>
                </Link>)}
            </ul>
        </div>
    </nav>
}

const paths = [
    {url: '/news', text: 'Novosti'},
    {url: '/gallery', text: 'Galerije' },
    {url: '/team', text: 'O nama'},
    {url: '/volunteer', text: 'Volontiraj'}
]