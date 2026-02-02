import { Link, useSearchParams } from 'react-router-dom';
import postsData from '../data/posts.json';
import './Blog.css';

function getAllTags(posts) {
  const set = new Set();
  posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return [...set].sort();
}

function getAllCategories(posts) {
  const set = new Set();
  posts.forEach((p) => p.category && set.add(p.category));
  return [...set].sort();
}

function getMonths(posts) {
  const set = new Set();
  posts.forEach((p) => p.month && set.add(p.month));
  return [...set].sort((a, b) => b.localeCompare(a));
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get('tag') || '';
  const category = searchParams.get('category') || '';

  const tags = getAllTags(postsData);
  const categories = getAllCategories(postsData);
  const months = getMonths(postsData);

  let filtered = [...postsData];
  if (tag) filtered = filtered.filter((p) => (p.tags || []).includes(tag));
  if (category) filtered = filtered.filter((p) => p.category === category);

  const clearFilters = () => setSearchParams({});

  return (
    <div className="blog-page">
      <h1>Blog</h1>
      <div className="blog-layout">
        <aside className="blog-sidebar">
          <section className="sidebar-section">
            <h3>월별</h3>
            <ul className="filter-list">
              {months.map((m) => (
                <li key={m}>
                  <Link to={`/blog/${m}`}>{m}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="sidebar-section">
            <h3>태그</h3>
            <ul className="filter-list tags">
              {tags.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    className={tag === t ? 'active' : ''}
                    onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), tag: t })}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="sidebar-section">
            <h3>카테고리</h3>
            <ul className="filter-list">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    className={category === c ? 'active' : ''}
                    onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), category: c })}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {(tag || category) && (
            <button type="button" className="clear-filters" onClick={clearFilters}>
              필터 지우기
            </button>
          )}
        </aside>
        <div className="blog-list">
          {filtered.length === 0 ? (
            <p className="empty">해당하는 글이 없습니다.</p>
          ) : (
            <ul className="post-cards">
              {filtered.map((post) => (
                <li key={post.path} className="post-card">
                  <Link to={`/blog/${post.month}/${post.slug}`}>
                    <span className="post-card-title">{post.title}</span>
                    <span className="post-card-meta">
                      {post.date} · {post.month} {post.category && `· ${post.category}`}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="post-card-tags">
                        {post.tags.map((t) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
