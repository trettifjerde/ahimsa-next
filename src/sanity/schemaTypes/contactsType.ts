import { defineField, defineType } from "sanity";

export const contactsType = defineType({
    name: 'contacts',
    title: 'Kontakti',
    type: 'document',
    fields: [
        defineField({
            name: 'greeting',
            title: 'Greeting text',
            type: 'array',
            of: [{type: 'block'}],
            validation: (rule) => rule.required().error('Obavezno')
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string'
        }),
        defineField({
            name: 'address',
            title: 'Adresa',
            type: 'string'
        }),
        defineField({
            name: 'phone',
            title: 'Telefonski broj',
            type: 'string'           
        }),
        defineField({
            name: 'facebook',
            title: 'Facebook',
            type: 'string'
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram',
            type: 'string'
        }),
        defineField({
            name: 'other',
            title: 'Ostalo',
            type: 'array',
            of: [{
                type: 'object',
                title: '',
                fields: [
                    {name: 'name', title: 'Contact type (npr. OIB)', type: 'string', validation: (rule) => rule.required()},
                    {name: 'value', title: 'Contact info', type: 'string', validation: (rule) => rule.required()}
                ]
            }],
            validation: (rule) => rule.required()
        })
    ],
    preview: {
        select: {
            title: 'Kontakti'
        }
    }
});