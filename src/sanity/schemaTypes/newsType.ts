import { defineField, defineType } from "sanity";

export const newsType = defineType({
    name: 'news',
    title: 'News',
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
            title: 'Poveznica (samo onaj dio koji ide nakon "/news/")',
            options: { source: 'title' },
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'date',
            type: 'date',
            title: 'Datum',
            initialValue: (new Date().toISOString()),
            options: {
                dateFormat: "DD. MM. YYYY.",
            },
            validation: (rule) => rule
            .required()
            .error('Obavezno')
        }),
        defineField({
            name: 'description',
            type: 'array',
            title: 'Tekst vijesti',
            of: [{ type: 'block' }],
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'excerpt',
            type: 'string',
            title: 'Odlomak za preview u popisu svih vijesti',
            validation: (rule) => rule
                .required()
                .error('Obavezno')
        }),
        defineField({
            name: 'image',
            title: 'Slika',
            type: 'image',
        }),
    ],
    preview: {
        select: {
          title: 'title',
          subtitle: 'excerpt',
          media: 'image'
        }
      }
});