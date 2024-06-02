import { ReactNode } from "react";
import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/gallery-grid";
import YearLayout from "@/components/ui/year/layout/year-layout";
import GalleryContextProvider from "@/components/gallery/gallery-context";

export const metadata: Metadata = {
    title: 'Galerije',
    description: 'Pogledajte slike Udruge Ahimsa'
}

export default function GalleryPageLayout({ children }: { children: ReactNode }) {

    return <YearLayout header="Galerije" url="/gallery" GridComponent={GalleryGrid}>
        <GalleryContextProvider>
            {children}
        </GalleryContextProvider>
    </YearLayout>
}