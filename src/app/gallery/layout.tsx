import { ReactNode } from "react";
import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/gallery-grid";
import ListLayout from "@/components/ui/list/layout/list-layout";
import ListContextProvider from "@/components/ui/list/list-context-provider";
import GalleryContext from "@/components/gallery/gallery-context";

export const metadata: Metadata = {
    title: 'Galerije',
    description: 'Pogledajte slike Udruge Ahimsa'
}

export default function GalleryPageLayout({ children }: { children: ReactNode }) {

    return <ListLayout url="/gallery"
        GridComponent={GalleryGrid}>

        <ListContextProvider url="/gallery" keyName="start" Cont={GalleryContext}>
            {children}
        </ListContextProvider>

    </ListLayout>
}