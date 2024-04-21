import { ReactNode } from "react";

export default function Main({className, children}: {className?: string, children: ReactNode}) {
    return <main className={className || ''}>{children}</main>
}