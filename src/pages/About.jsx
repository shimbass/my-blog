import './About.css';

export default function About() {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        이 블로그는 <strong>정적 사이트</strong>로 빌드되어 GitHub Pages에 호스팅됩니다.
      </p>
      <p>
        <code>content/YYYY-MM/</code> 폴더에 마크다운(.md) 파일을 넣고, 상단에 제목·날짜·태그·카테고리를 frontmatter로 적으면 자동으로 글이 반영됩니다.
      </p>
      <h2>사용법</h2>
      <ul>
        <li>글 작성: <code>content/2025-01/my-post.md</code> 형태로 저장</li>
        <li>frontmatter: <code>title</code>, <code>date</code>, <code>tags</code>, <code>category</code></li>
        <li>빌드: <code>npm run build</code> 후 <code>dist</code>를 GitHub Pages에 배포</li>
      </ul>
    </div>
  );
}
