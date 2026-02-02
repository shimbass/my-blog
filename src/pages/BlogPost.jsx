import { Link, useParams } from 'react-router-dom';
import postsData from '../data/posts.json';
import Markdown from '../components/Markdown';
import './BlogPost.css';

export default function BlogPost() {
  const { yearMonth, slug } = useParams();
  const post = postsData.find((p) => p.month === yearMonth && p.slug === slug);

  if (!post) {
    return (
      <div className="blog-post">
        <p>글을 찾을 수 없습니다.</p>
        <Link to="/blog">Blog 목록으로</Link>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <nav className="breadcrumb">
        <Link to="/blog">Blog</Link>
        <span className="sep">/</span>
        <Link to={`/blog/${post.month}`}>{post.month}</Link>
        <span className="sep">/</span>
        <span>{post.title}</span>
      </nav>
      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{post.date}</span>
          {post.category && (
            <>
              <span className="dot">·</span>
              <span>{post.category}</span>
            </>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
      </header>
      <Markdown content={post.content} />
      <footer className="post-footer">
        <Link to="/blog">← 목록으로</Link>
      </footer>
    </div>
  );
}
