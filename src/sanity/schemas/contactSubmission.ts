import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subject',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const statusLabel = status === 'new' ? '🔴 ' : status === 'read' ? '🟡 ' : status === 'replied' ? '🟢 ' : '⚪ ';
      return {
        title: `${statusLabel}${title}`,
        subtitle,
      };
    },
  },
});
