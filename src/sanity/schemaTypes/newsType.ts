import { defineField, defineType } from "sanity";

export const newsType = defineType({
    name: 'news',
    title: 'News',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule
                .required()
                .error('Required')
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule
                .required()
                .error('Required')
        }),
        defineField({
            name: 'date',
            type: 'date',
            initialValue: (new Date().toLocaleDateString('hr')),
            options: {
                dateFormat: "DD. MM. YYYY.",
            },
            validation: (rule) => rule
            .required()
            .error('Required')
        }),
        defineField({
            name: 'description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule
                .required()
                .error('Required')
        }),
        defineField({
            name: 'image',
            type: 'image',
        }),
    ],
    preview: {
        select: {
          title: 'title',
          subtitle: 'slug.current',
          media: 'image'
        }
      }
});