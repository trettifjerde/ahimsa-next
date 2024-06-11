import { defineField, defineType } from "sanity";
import { storyCategory } from "./storyCategory";
import { BLOCK_INFO } from "./block-styles";

export const storyType = defineType({
    name: 'story',
    title: 'Priče',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Poveznica (samo dio nakon "/stories/")',
            options: { source: 'title'},
            validation: (rule) => rule
                .required()
                .error('Ne smije biti prazna ili poklapati se s poveznicama drugih članaka iste vrste'),
        }),
        defineField({
            name: 'categories',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type: storyCategory.name}]
            }],
            validation: rule => rule.required().unique().error('Obavezno')
        }),
        defineField({
            name: 'date',
            type: 'datetime',
            title: 'Datum publikacije',
            initialValue: (new Date().toISOString()),
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'description',
            type: 'array',
            title: 'Tekst',
            of: [BLOCK_INFO],
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'excerpt',
            type: 'string',
            title: 'Odlomak za preview u popisu svih priča',
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'mainImage',
            title: 'Naslovna slika',
            type: 'ahimsaImage'
        }),
        defineField({
            name: 'gallery',
            title: 'Dodatne slike',
            type: 'array',
            of: [{type: 'ahimsaImage'}]
        }),
    ],
    preview: {
        select: {
          title: 'title',
          date: 'date',
          media: 'mainImage.image'
        },
        prepare: ({title, date, media}) => {
            return {
                title,
                subtitle: new Date(date).toLocaleString('hr', {dateStyle: 'short', timeStyle: 'short'}),
                media
            }
        }
      }
});