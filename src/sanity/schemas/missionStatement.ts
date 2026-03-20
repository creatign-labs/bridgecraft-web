import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'missionStatement',
  title: 'Mission Statement',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Mission Statement Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Mission Statement' };
    },
  },
});
