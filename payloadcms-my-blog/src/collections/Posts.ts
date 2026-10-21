import type { CollectionConfig } from 'payload'

const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        and: [
          { publishedAt: { exists: true } },
          { publishedAt: { less_than_equal: new Date().toISOString() } },
        ],
      }
    },
    create: ({ req }) => Boolean(req.user), // cả admin và editor tạo được
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      // editor chỉ sửa được bài do chính mình tạo
      if (req.user?.role === 'editor') {
        return { author: { equals: req.user.id } }
      }
      return false
    },
    delete: ({ req }) => req.user?.role === 'admin', // chỉ admin xóa được
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          data.slug = formatSlug(data.title)
        }

        return data
      },
    ],
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create' && req.user) {
          data.author = req.user.id
        }
        return data
      },
    ],
  },
}
