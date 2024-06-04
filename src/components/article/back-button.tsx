'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/buttons";

export default function BackButton({text}: {text: string}) {
    const router = useRouter();

    return <Button isSmall onClick={() => router.back()}>{text}</Button>
}