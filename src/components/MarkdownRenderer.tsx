import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Spin } from 'antd';
import { getResourcePath } from '../utils/pathUtils';

interface MarkdownRendererProps {
  content?: string;
  filePath?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, filePath }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(!!filePath);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If content is directly provided, use it
    if (content) {
      setMarkdown(content);
      setLoading(false);
      return;
    }

    // If a file path is provided, load content from the file
    if (filePath) {
      setLoading(true);
      const resourcePath = getResourcePath(filePath);
      fetch(resourcePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load Markdown file: ${response.statusText}`);
          }
          return response.text();
        })
        .then((text) => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading Markdown file:', err);
          setError(`Unable to load Markdown content: ${err.message}`);
          setLoading(false);
        });
    }
  }, [content, filePath]);

  if (loading) {
    return <Spin tip="Loading document..." />;
  }

  if (error) {
    return <div className="markdown-error">{error}</div>;
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
