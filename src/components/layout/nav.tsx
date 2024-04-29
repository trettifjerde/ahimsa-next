'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
export default function Navigation() {
    const pathname = usePathname();

    return <nav>
        <div className="nav-inner">
            <Link href="/" className="logo-c">
                <Logo />
            </Link>
            <ul className="menu">
                {paths.map(p => <Link key={p.url} href={p.url}>
                    <li className={p.url === pathname ? 'active' : ''}>{p.text}</li>
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