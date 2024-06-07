import { NewsArticle, StoryArticle } from "@/sanity/lib/types";

export type FormErrorLog<EL> = EL | null;
export type FormValidator<EL> = (formData: FormData) => FormErrorLog<EL>;
export type FormActionResponse<EL> = {status: 200} | {status: 400, errors: FormErrorLog<EL>} | {status: 500};
export type FormServerAction<EL> = (formData: FormData) => Promise<FormActionResponse<EL>>;

export type GroqYearParams = {end: string, batchSize: number, start: string};
export type GroqStoriesParams = {end: string, batchSize: number, catId?: string};

export type FetcherEntryMeta = {
    key: string,
    lastDate: string
};
export type FetcherEntry<I> = {items: I[], lastDate: string};
export type BatchFetcherBody<I> = { error: string } | FetcherEntry<I>;

export type ArticleType = NewsArticle & {categories?: StoryArticle['categories']};