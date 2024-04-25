import Link from "next/link";
import Logo from "./logo";
export default function Navigation() {
    return <nav>
        <div className="nav-inner">
            <Link href="/" className="logo-c">
                <Logo />
            </Link>
            <ul>
                <Link href="/news"><li>Novosti</li></Link>
                <Link href="/gallery"><li>Galerije</li></Link>
                <Link href="/team"><li>O nama</li></Link>
                <Link href="/volunteer"><li>Volontiraj</li></Link>
            </ul>
        </div>
    </nav>
}