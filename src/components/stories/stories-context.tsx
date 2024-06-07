'use client';

import { StoryCategoryDict, StoryPreview} from "@/sanity/lib/types";
import { ReactNode, createContext } from "react";
import ListContextProvider, { createListContext } from "../ui/list/list-context-provider";

export const CategoriesContext = createContext<StoryCategoryDict>({});
export const StoriesContext = createListContext<StoryPreview>();

export default function StoriesContextProvider({children, categories}: {categories: StoryCategoryDict, children: ReactNode}) {

    return <CategoriesContext.Provider value={categories}>
        <ListContextProvider url="/stories" keyName="catId" Cont={StoriesContext}>
            {children}
        </ListContextProvider>
    </CategoriesContext.Provider>
}