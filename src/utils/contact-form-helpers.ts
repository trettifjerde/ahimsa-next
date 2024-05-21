import { EMAIL, MESSAGE, MESSAGE_LIMIT, isValidEmail, requiredValidator } from "@/utils/validators";

export const contactFormFields = {
    [EMAIL]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => isValidEmail(value),
                message: 'Invalid email'
            }
        ]
    },
    [MESSAGE]: {
        validators: [
            requiredValidator,
            {
                f: (value: string) => value.length < MESSAGE_LIMIT,
                message: `Must be under ${MESSAGE_LIMIT} characters`
            }
        ]
    },
};

export type ContactFormKey = keyof typeof contactFormFields;
export const contactFormKeys : ContactFormKey[] = [EMAIL, MESSAGE];
export type ContactFormErrorLog = {[key in ContactFormKey]?: string};

export function validateContactForm(data: FormData) {

    const errorLog : ContactFormErrorLog = {};

    for (const key of contactFormKeys) {
        const value = data.get(key)?.toString() || '';

        for (const validator of contactFormFields[key].validators) {
            if (!validator.f(value)) {
                errorLog[key] = validator.message;
                break;
            }
        }
    }

    return Object.keys(errorLog).length == 0 ? null : errorLog;
}