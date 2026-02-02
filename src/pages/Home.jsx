import { Link } from 'react-router-dom';
import postsData from '../data/posts.json';
import './Home.css';

export default function Home() {
  const posts = postsData.slice(0, 5);

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome</h1>
        <p className="lead">
          마크다운으로 쓰는 정적 블로그입니다. Home, About, Blog 메뉴와 월별·태그·카테고리로 글을 정리할 수 있습니다.
        </p>
      </section>
      <section className="recent">
        <h2>최근 글</h2>
        {posts.length === 0 ? (
          <p className="empty">아직 글이 없습니다. <code>content/YYYY-MM/</code> 폴더에 마크다운 파일을 추가한 뒤 <code>npm run build</code>를 실행하세요.</p>
        ) : (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.path}>
                <Link to={`/blog/${post.month}/${post.slug}`} className="post-link">
                  <span className="post-title">{post.title}</span>
                  <span className="post-meta">{post.date} · {post.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {posts.length > 0 && (
          <p className="more">
            <Link to="/blog">모든 글 보기 →</Link>
          </p>
        )}
      </section>
    </div>
  );
}
