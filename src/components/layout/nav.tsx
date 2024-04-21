import Image from "next/image";
import logo from "@/../public/logo.svg";
export default function Navigation() {
    return <nav>
        <div className="logo">
            <Image src={logo} fill alt="Ahimsa logo"/>
        </div>
        <ul>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
        </ul>
    </nav>
}