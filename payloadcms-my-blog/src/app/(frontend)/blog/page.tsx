import Image from 'next/image'
import Link from 'next/link'

import { formatPostDate, getMediaUrl, getPublishedPosts } from '@/lib/blog'

export const metadata = {
  title: 'Blog',
  description: 'Danh sach bai viet duoc publish.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <div className="site-shell">
      <header className="hero compact">
        <p className="eyebrow">CodeDream Journal</p>
        <h1>Bai viet moi nhat</h1>
        <p className="subhead">Noi chia se kinh nghiem xay dung du an voi PayloadCMS va Next.js.</p>
      </header>

      <section className="post-grid" aria-label="Danh sach bai viet">
        {posts.length === 0 ? (
          <p>Chua co bai viet nao duoc publish.</p>
        ) : (
          posts.map((post) => {
            const imageUrl = getMediaUrl(post.coverImage)
            const publishedDate = formatPostDate(post.publishedAt)

            return (
              <article key={post.id} className="post-card">
                {imageUrl ? (
                  <Link href={`/blog/${post.slug}`} className="post-cover-link">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      width={900}
                      height={540}
                      className="post-cover"
                    />
                  </Link>
                ) : null}

                <div className="post-card-content">
                  <p className="post-meta">
                    {publishedDate ? <time dateTime={post.publishedAt ?? undefined}>{publishedDate}</time> : 'Dang cap nhat'}
                    {post.category && typeof post.category !== 'string' ? ` · ${post.category.name}` : ''}
                  </p>
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                </div>
              </article>
            )
          })
        )}
      </section>
    </div>
  )
}
