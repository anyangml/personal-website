import React, { useState } from 'react';
import { Typography, List, Button } from 'antd';
import { blogData } from '../data/blogData';
import MarkdownRenderer from '../components/MarkdownRenderer';
import '../styles/Blog.css';

const { Text, Paragraph } = Typography;

const Blog: React.FC = () => {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const toggleExpanded = (postTitle: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postTitle)) {
      newExpanded.delete(postTitle);
    } else {
      newExpanded.add(postTitle);
    }
    setExpandedPosts(newExpanded);
  };

  const getPreviewContent = (content: string) => {
    // Get first paragraph or first 200 characters, whichever is shorter
    const firstParagraph = content.split('\n\n')[0];
    return firstParagraph.length > 200 ? firstParagraph.substring(0, 200) + '...' : firstParagraph;
  };

  return (
    <div className="blog-section">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={blogData}
        renderItem={post => {
          const isExpanded = expandedPosts.has(post.title);
          const previewContent = getPreviewContent(post.content);
          
          return (
            <List.Item
              key={post.title}
              actions={[
                <Button 
                  type="link" 
                  className="gold-link"
                  onClick={() => toggleExpanded(post.title)}
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<span className="gold-link">{post.title}</span>}
                description={<Text type="secondary">{post.date}</Text>}
              />
              {isExpanded ? (
                <MarkdownRenderer content={post.content} />
              ) : (
                <Paragraph>
                  {previewContent}
                </Paragraph>
              )}
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Blog; 