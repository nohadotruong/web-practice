import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/rsc'

import { formatPostDate, getMediaUrl, getPublishedPostBySlug } from '@/lib/blog'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) {
    return {
      title: 'Khong tim thay bai viet',
    }
  }

  return {
    title: post.title,
    description: `Chi tiet bai viet: ${post.title}`,
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = formatPostDate(post.publishedAt)
  const imageUrl = getMediaUrl(post.coverImage)

  return (
    <div className="site-shell">
      <p className="back-link">
        <Link href="/blog"><- Quay lai danh sach bai viet</Link>
      </p>

      <article className="post-detail">
        <header>
          <p className="post-meta">
            {publishedDate ? <time dateTime={post.publishedAt ?? undefined}>{publishedDate}</time> : null}
            {post.category && typeof post.category !== 'string' ? ` · ${post.category.name}` : ''}
          </p>
          <h1>{post.title}</h1>
        </header>

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={720}
            className="post-hero-image"
            priority
          />
        ) : null}

        {post.content ? (
          <div className="richtext-body">
            <RichText data={post.content} />
          </div>
        ) : (
          <p>Noi dung dang duoc cap nhat.</p>
        )}
      </article>
    </div>
  )
}
