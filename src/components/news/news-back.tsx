'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/buttons";

export default function NewsBack() {
    const router = useRouter();

    return <Button isOutlined isSmall onClick={() => router.back()}>back to news</Button>
}