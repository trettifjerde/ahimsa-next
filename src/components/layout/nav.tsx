import Link from "next/link";
import Logo from "./logo";
export default function Navigation() {
    return <nav>
        <Link href="/" className="logo-c">
            <Logo />
        </Link>
        <ul>
            <Link href="/news"><li>News</li></Link>
            <Link href="/gallery"><li>Gallery</li></Link>
            <Link href="/team"><li>Team</li></Link>
            <Link href="/volunteer"><li>Join us</li></Link>
        </ul>
    </nav>
}