'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
import styles from './nav.module.css';
import menuStyles from '@/styles/menu.module.css';
import { useEffect, useState } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (menu)
            document.addEventListener('click', () => setMenu(false), {once: true});
    }, [menu]);

    return <nav className={`${styles.nav} ${menu ? styles.open : ''}`}>
        <div className={styles.inner}>
            <Link href="/" className={styles.logo}>
                <Logo />
            </Link>
            <button className={styles.burger} type="button" onClick={() => setMenu(prev => !prev)}>
                <span></span>
            </button>
            <div className={styles.menu}>
                <ul className={`${menuStyles.ul}`}>
                    {paths.map(p => <Link key={p.url} href={p.url}>
                        <li className={pathname.startsWith(p.url) ? menuStyles.active : ''}>{p.text}</li>
                    </Link>)}
                </ul>
            </div>
        </div>
    </nav>
}

const paths = [
    {url: '/news', text: 'Novosti'},
    {url: '/gallery', text: 'Galerije' },
    {url: '/stories', text: 'Naše priče'},
    {url: '/team', text: 'Ekipa'},
    {url: '/contact', text: 'Kontakti'},
]