import { defineField, defineType } from "sanity";

export const landingType = defineType({
    name: 'landing',
    title: 'Naslovna',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            type: 'array',
            title: 'Glavni tekst',
            of: [{type: 'block'}]
        }),
        defineField({
            name: 'images',
            title: 'Slike naslovne',
            type: 'array',
            of: [{type: 'image', options: {hotspot: true}}]
        })
    ],
    preview: {
        select: {
            title: 'Naslovna'
        }
    }
});