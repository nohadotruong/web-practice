import Link from 'next/link'
import React from 'react'
import './styles.css'

export default async function HomePage() {
  return (
    <div className="site-shell">
      <header className="hero">
        <p className="eyebrow">PayloadCMS Personal Project</p>
        <h1>Xay dung blog ca nhan bang Payload + Next.js</h1>
        <p className="subhead">
          Du an da co collections, access control, hook tao slug, va frontend route de hien thi bai viet
          da publish.
        </p>

        <div className="hero-actions">
          <Link href="/blog" className="button primary">
            Xem blog
          </Link>
          <a className="button ghost" href="/admin" target="_blank" rel="noopener noreferrer">
            Mo admin
          </a>
        </div>
      </header>

      <section className="roadmap">
        <h2>Lo trinh goi y</h2>
        <ol>
          <li>Tao category va post trong admin.</li>
          <li>Dat ngay publish de bai viet hien ra ngoai frontend.</li>
          <li>Thu nghiem role admin/editor de kiem tra phan quyen.</li>
          <li>Mo rong tiep voi globals, SEO va search plugin.</li>
        </ol>
      </section>
    </div>
  )
}
