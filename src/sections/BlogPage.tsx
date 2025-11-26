import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { blogData } from '../data/blogData';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getResourcePath } from '../utils/pathUtils';
import '../styles/Blog.css';

const { Title, Text } = Typography;

const BlogPage: React.FC = () => {
  const { blogTitle } = useParams<{ blogTitle: string }>();
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const blog = blogData.find(
    p => p.title.replace(/\s+/g, '-').toLowerCase() === blogTitle
  );

  useEffect(() => {
    if (blog?.markdownFile) {
      setLoading(true);
      fetch(getResourcePath(blog.markdownFile))
        .then(response => response.text())
        .then(text => {
          setMarkdownContent(text);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading markdown:', error);
          setLoading(false);
        });
    }
  }, [blog]);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="blog-page">
      <Link to="/#blog">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          className="back-button"
        >
          Back to Blog
        </Button>
      </Link>
      
      <div className="blog-header">
        <Title level={2}>{blog.title}</Title>
        <Text type="secondary">{blog.date}</Text>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className="blog-content">
          <MarkdownRenderer content={markdownContent} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
