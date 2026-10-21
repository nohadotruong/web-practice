import { getPayload } from 'payload'

import type { Media, Post } from '@/payload-types'
import config from '@/payload.config'

const getPayloadClient = async () => {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
}

export const getPublishedPosts = async () => {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { publishedAt: { exists: true } },
        { publishedAt: { less_than_equal: new Date().toISOString() } },
      ],
    },
    sort: '-publishedAt',
    depth: 2,
  })

  return posts.docs
}

export const getPublishedPostBySlug = async (slug: string) => {
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { publishedAt: { exists: true } },
        { publishedAt: { less_than_equal: new Date().toISOString() } },
      ],
    },
    limit: 1,
    depth: 2,
  })

  return posts.docs[0] ?? null
}

export const formatPostDate = (value?: string | null) => {
  if (!value) return null

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'long',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(value))
}

export const getMediaUrl = (coverImage: Post['coverImage']) => {
  if (!coverImage || typeof coverImage === 'string') return null

  return (coverImage as Media).url ?? null
}
