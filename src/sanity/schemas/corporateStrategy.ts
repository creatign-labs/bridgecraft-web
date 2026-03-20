import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'corporateStrategy',
  title: 'Corporate Strategy',
  type: 'document',
  fields: [
    defineField({
      name: 'pillars',
      title: 'Strategic Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
              name: 'bulletPoints',
              title: 'Bullet Points',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Corporate Strategy' };
    },
  },
});
