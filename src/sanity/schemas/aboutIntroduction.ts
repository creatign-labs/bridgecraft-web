import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutIntroduction',
  title: 'About - Introduction',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About - Introduction' };
    },
  },
});
