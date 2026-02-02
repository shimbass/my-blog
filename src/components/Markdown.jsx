import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Markdown.css';

export default function Markdown({ content }) {
  return (
    <article className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || ''}</ReactMarkdown>
    </article>
  );
}
