import React from 'react';
import { Typography, List, Button } from 'antd';
import { blogData } from '../data/blogData';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

const { Text, Paragraph } = Typography;

const Blog: React.FC = () => {
  return (
    <div className="blog-section">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={blogData}
        renderItem={post => {
          const blogUrl = `/blog/${post.title.replace(/\s+/g, '-').toLowerCase()}`;
          
          return (
            <List.Item
              key={post.title}
              actions={[
                <Link to={blogUrl}>
                  <Button type="link" className="gold-link">
                    Read more
                  </Button>
                </Link>
              ]}
            >
              <List.Item.Meta
                title={<Link to={blogUrl} className="gold-link">{post.title}</Link>}
                description={<Text type="secondary">{post.date}</Text>}
              />
              <Paragraph>{post.summary}</Paragraph>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default Blog;
