import { Link, useParams } from 'react-router-dom';
import postsData from '../data/posts.json';
import './BlogMonth.css';

export default function BlogMonth() {
  const { yearMonth } = useParams();
  const posts = postsData.filter((p) => p.month === yearMonth);

  return (
    <div className="blog-month">
      <nav className="breadcrumb">
        <Link to="/blog">Blog</Link>
        <span className="sep">/</span>
        <span>{yearMonth}</span>
      </nav>
      <h1>{yearMonth}</h1>
      {posts.length === 0 ? (
        <p className="empty">이 달에 작성된 글이 없습니다.</p>
      ) : (
        <ul className="month-list">
          {posts.map((post) => (
            <li key={post.path}>
              <Link to={`/blog/${post.month}/${post.slug}`} className="month-post-link">
                <span className="title">{post.title}</span>
                <span className="meta">{post.date} {post.category && `· ${post.category}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
