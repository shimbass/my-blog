# My Blog (정적 블로그)

마크다운으로 글을 쓰고, 정적 사이트로 빌드해 **GitHub Pages**에 호스팅하는 블로그입니다.

## 기능

- **정적 빌드**: `npm run build`로 `dist` 폴더에 정적 파일 생성
- **마크다운**: `content/YYYY-MM/` 폴더에 `.md` 파일 작성 → 멋지게 렌더링
- **메뉴**: Home, About, Blog
- **월별 관리**: `content/2025-01/`, `content/2025-02/` 등으로 월별 아카이브
- **태그·카테고리**: frontmatter에 `tags`, `category` 지정 → Blog 페이지에서 필터

## 글 작성 방법

1. `content/YYYY-MM/` 폴더를 만듭니다 (예: `content/2025-01/`).
2. 그 안에 마크다운 파일을 만듭니다 (예: `my-post.md`).
3. 파일 **맨 위**에 frontmatter를 넣습니다:

```yaml
---
title: "글 제목"
date: 2025-01-15
tags: ["태그1", "태그2"]
category: "카테고리명"
---

본문 마크다운...
```

4. `npm run build`를 실행하면 글이 반영됩니다.

## 로컬 실행

```bash
npm install
npm run prebuild   # content → src/data/posts.json 생성 (최초 1회 또는 글 추가 후)
npm run dev       # 개발 서버 (http://localhost:5173)
```

## 빌드 및 GitHub Pages 배포

1. **저장소 이름에 맞게 base 설정**

   GitHub Pages 주소가 `https://username.github.io/my-blog/` 라면,  
   `vite.config.js`에서 `base: '/my-blog/'` 로 설정합니다.  
   (`https://username.github.io/` 에 배포하면 `base: '/'` 로 두면 됩니다.)

2. **빌드**

```bash
npm run build
```

3. **배포**

   - `dist` 폴더 내용을 GitHub 저장소의 **gh-pages** 브랜치에 push 하거나,
   - GitHub Actions로 `main` 푸시 시 자동으로 `dist`를 GitHub Pages에 배포하도록 설정할 수 있습니다.

## 프로젝트 구조

```
my-blog/
├── content/           # 마크다운 글 (월별: 2025-01, 2025-02, ...)
├── scripts/
│   ├── build-content.js   # content → src/data/posts.json
│   └── copy-404.js        # SPA용 404.html 생성
├── src/
│   ├── data/posts.json    # 빌드 시 생성됨
│   ├── components/
│   ├── pages/
│   └── ...
└── dist/              # npm run build 결과물 → GitHub Pages에 업로드
```

## 기술 스택

- Vite + React
- React Router
- react-markdown + remark-gfm (마크다운 렌더링)
- gray-matter (frontmatter 파싱)
