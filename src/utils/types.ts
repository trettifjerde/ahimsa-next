export type FormErrorLog<EL> = EL | null;
export type FormValidator<EL> = (formData: FormData) => FormErrorLog<EL>;
export type FormActionResponse<EL> = {status: 200} | {status: 400, errors: FormErrorLog<EL>} | {status: 500};
export type FormServerAction<EL> = (formData: FormData) => Promise<FormActionResponse<EL>>;