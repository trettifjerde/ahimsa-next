import Link from "next/link";
import { Button } from "../ui/buttons";

export default function BackButton({url, text}: {url: string, text: string}) {
    return <Link href={url}>
        <Button isSmall>{text}</Button>
    </Link>
}