export const UDRUGA_START_YEAR = parseInt(process.env.NEXT_PUBLIC_UDRUGA_START_YEAR || '2016');

export const UDRUGA_ALL_YEARS = (() => {
    const years: string[] = [];
    const curYear = new Date().getFullYear();
    for (let y = curYear; y >= UDRUGA_START_YEAR; y--)
        years.push(y.toString());
    return years;
})();

export const NEWS_BATCH_SIZE = parseInt(process.env.NEWS_BATCH_SIZE || '10');
export const GALLERY_BATCH_SIZE = parseInt(process.env.GALLERY_BATCH_SIZE || '5');
export const STORIES_BATCH_SIZE = parseInt(process.env.STORIES_BATCH_SIZE || '5');
export const REVALIDATE_TIMEOUT = parseInt(process.env.REVALIDATE_TIMEOUT || '5');
export const MAIL_ADMINS = process.env.MAIL_ADMINS || 'sasjandreeva@gmail.com';

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || 'sasjandreeva@gmail.com';