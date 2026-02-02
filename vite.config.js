import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages: repository 이름으로 변경하세요 (예: '/my-blog/')
const base = process.env.BASE_PATH || '/my-blog/';

export default defineConfig({
  plugins: [react()],
  base,
});
