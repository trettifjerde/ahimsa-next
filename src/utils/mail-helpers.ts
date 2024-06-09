import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ContactFormData } from './contact-form-helpers';
import { VolunteerFormData } from './volunteer-form-helpers';
import { EMAIL_USERNAME, MAIL_ADMINS } from './env-fallback';

export async function sendMails(type: FormType, formData: FormData) {
    try {

        const email = formData.get('email')?.toString();

        if (!email)
            throw new Error('sendMails: Email is not defined in the form');

        
        const mails = makeMails(type, formData);

        for (const mail of mails)
            console.log(mail);

        // const transporter = nodemailer.createTransport({
        //     host: 'mail.privateemail.com',
        //     auth: {
        //         user: `${process.env.EMAIL_USERNAME}`,
        //         pass: `${process.env.EMAIL_PASSWORD}`,
        //     },
        //     secure: true,
        // });

        // for (const mail of mails) {
        //     transporter.sendMail(mail)
        //         .then(res => {
        //             if (res.accepted)
        //                 console.log(`${type} mail sent to: ${mail.to}`);
        //             else {
        //                 console.log(`Error sending ${type} mail to ${mail.to}`);
        //                 console.log('Response:', res.response);
        //             }
        //         })
        //         .catch(err => {
        //             console.log(`Error sending ${type} mail to ${mail.to}\n${err}`);
        //         })
        // }
    }
    catch (err) {
        console.log(`Failed to send ${type} email`);
        console.log(err);
    }
}

type FormType = 'contact' | 'volunteer';

export function extractDataFromForm<T>(f: FormData) {
    return Object.fromEntries(f.entries()) as T;
}

function makeMails(type: FormType, formData: FormData) {
    const mails : Mail.Options[] = [];

    switch (type) {
        case 'contact':
            const cfd = extractDataFromForm<ContactFormData>(formData);

            mails.push({
                to: MAIL_ADMINS,
                subject: `${cfd.email} contacted Udruga`,
                html: makeMailHTML({
                    heading: '', 
                    startText: '',
                    data: cfd,
                    endText: ''
                })
            });

            mails.push({
                to: cfd.email,
                subject: 'Your message is received',
                html: makeMailHTML({
                    heading: '', 
                    startText: '',
                    data: cfd,
                    endText: ''
                })
            });
            break;

        case 'volunteer':
            const vfd = extractDataFromForm<VolunteerFormData>(formData);

            mails.push({
                to: MAIL_ADMINS,
                subject: `${vfd.name} ${vfd.surname} wants to join Udruga`,
                html: makeMailHTML({
                    heading: '', 
                    startText: '',
                    data: vfd,
                    endText: ''
                })
            });

            mails.push({
                to: vfd.email,
                subject: `Your application is received`,
                html: makeMailHTML({
                    heading: '', 
                    startText: '',
                    data: vfd,
                    endText: ''
                })
            });
    }

    const sender: Mail.Address = { name: 'Udruga mladih Ahimsa', address: EMAIL_USERNAME };

    mails.forEach(mail => {
        mail.from = sender;
        mail.sender = sender;
    });

    return mails;
}

function makeMailHTML<T extends Object>({heading, startText, endText, data}: {
    heading: string, startText: string, endText: string, data: T
}) {
    
    const outerContStyles = `background-color:${STYLES.blue};padding:0.5rem;border-radius:${STYLES.navOuterBr};`;
    const innerContStyles = `background-color:${STYLES.light};padding:2rem;font-weight:300;border-radius:${STYLES.navInnerBR};`;
    const h = `<h3>${heading}</h3>`;
    const start = `<div>${startText}</div>`;
    const form = makeFormRecap(data);
    const end = `<div>${endText}</div>`;

    const content = h + start + form + end;
    
    return `<div style="${outerContStyles}"><div style="${innerContStyles}">${content}</div></div>`;
}

function makeFormRecap<T extends Object>(data: T) {
    let content  = '';

    for (const [key, value] of Object.entries(data)) {
        content += `<div style="padding-top:0.5rem;padding-bottom:0.5rem;font-weight:400;font-size:1.125rem;color:${STYLES.cian}">${key}</div>`;
        content += `<div style="padding:${STYLES.inputPadding};background-color:${STYLES.light};box-shadow:${STYLES.boxShadow};border-radius:${STYLES.inputBorderRadius}">${value}</div>`;
    }

    return `<div style="padding:3rem;background-color:${STYLES.lightDark};box-shadow:${STYLES.boxShadow};border-radius:${STYLES.formBorderRadius};">${content}</div>`;
}

const STYLES = {
    navOuterBr: '15% 35% 25% 10%',
    navInnerBR: '10% 10% 3rem 2rem',
    cian: '#55b0b3',
    blue: '#a9d3ec',
    inputBorderRadius: '0.25rem 1.25rem',
    inputPadding: '0.5rem 1.25rem',
    boxShadow: '0 0 1px #8f949080',
    formBorderRadius: '1% 25%',
    lightDark: '#f0f5f1',
    light: '#f5faf6'
}