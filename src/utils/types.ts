export type FormErrorLog<EL> = EL | null;
export type FormValidator<EL> = (formData: FormData) => FormErrorLog<EL>;
export type FormActionResponse<EL> = {status: 200} | {status: 400, errors: FormErrorLog<EL>} | {status: 500};
export type FormServerAction<EL> = (formData: FormData) => Promise<FormActionResponse<EL>>;

export type BatchFetcherItem = { date: string };
export type YearMeta = {
    year: number | null,
    hasMore: boolean,
    lastDate: string
}
export type YearContent<I extends BatchFetcherItem> = YearMeta & {items: I[] };
export type BatchFetcherResponse<I extends BatchFetcherItem> = {items: I[], hasMore: boolean};