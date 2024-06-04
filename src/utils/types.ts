import { getGroqYearParams, getGroqStoriesParams } from "./serverHelpers";

export type FormErrorLog<EL> = EL | null;
export type FormValidator<EL> = (formData: FormData) => FormErrorLog<EL>;
export type FormActionResponse<EL> = {status: 200} | {status: 400, errors: FormErrorLog<EL>} | {status: 500};
export type FormServerAction<EL> = (formData: FormData) => Promise<FormActionResponse<EL>>;

export type YearListQueryParams = ReturnType<typeof getGroqYearParams>;
export type StoriesListQueryParams = ReturnType<typeof getGroqStoriesParams>;

export type FetcherEntryMeta = {
    key: string,
    hasMore: boolean,
    lastDate: string
};
export type FetcherEntry<I> = FetcherEntryMeta & {items: I[] };
export type BatchFetcherResponse<I> = Omit<FetcherEntry<I>, 'key'>;
