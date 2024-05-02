import { ReactNode } from "react";
import YearLayout from "@/components/ui/year/layout/year-layout";
import GalleryGrid from "@/components/gallery/gallery-grid";

export default function GalleryLayout({children}: {children: ReactNode}) {
    return <YearLayout header="Galerije" url="/gallery" GridComponent={GalleryGrid}>
        {children}
    </YearLayout>
}