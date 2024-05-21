import { defineField, defineType } from "sanity";

export const newsType = defineType({
    name: 'news',
    title: 'Novosti',
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
            title: 'Poveznica (samo dio nakon "/news/")',
            options: { source: 'title'},
            validation: (rule) => rule
                .required()
                .error('Ne smije biti prazna ili poklapati se s poveznicama drugih novostnih članaka'),
        }),
        defineField({
            name: 'date',
            type: 'datetime',
            title: 'Datum',
            initialValue: (new Date().toISOString()),
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
            name: 'mainImage',
            title: 'Naslovna slika',
            type: 'image',
            options: {
                hotspot: true
            }

        }),
        defineField({
            name: 'gallery',
            title: 'Dodatne slike',
            type: 'array',
            of: [{type: 'image', options: {hotspot: true}}]
        }),
    ],
    preview: {
        select: {
          title: 'title',
          date: 'date',
          media: 'mainImage'
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