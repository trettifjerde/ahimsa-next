export function isValidEmail(value: string) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
}

export const NAME = 'name';
export const NAME_LIMIT = 100;
export const SURNAME = 'surname';
export const EMAIL = 'email';
export const MESSAGE = 'info';
export const MESSAGE_LIMIT = 10000;

export const requiredValidator = {
    f: (value: string) => !!value,
    message: 'Obavezno'
}