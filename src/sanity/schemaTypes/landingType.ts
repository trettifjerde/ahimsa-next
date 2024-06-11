import { defineField, defineType } from "sanity";
import { BLOCK_INFO } from "./block-styles";

export const landingType = defineType({
    name: 'landing',
    title: 'Naslovna',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            type: 'array',
            title: 'Glavni tekst',
            of: [BLOCK_INFO],
            validation: (rule) => rule.required().error('Obavezno')
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