import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Layout, Divider, Tag, Image, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { projectsData } from '../data/projectsData';
import MarkdownRenderer from '../components/MarkdownRenderer';
import '../styles/ProjectPage.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.title.replace(/\s+/g, '-').toLowerCase() === id);

  const handleBack = () => {
    // Navigate back to the main page with state indicating we're coming from a project page
    navigate('/?tab=projects', { state: { fromProject: true } });
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px', marginTop: '64px' }}>
        <div className="site-layout-content">
          <div className="project-back-button">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              style={{ marginBottom: '20px' }}
            >
              Back to Projects
            </Button>
          </div>
          <Title>{project.title}</Title>
          {project.imageUrl && (
            <div className="project-featured-image">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          )}
          
          <div className="project-tech-tags">
            {project.technologies?.map((tech, index) => (
              <Tag key={index} color="blue">{tech}</Tag>
            ))}
          </div>
          
          <Divider />
          
          <Title level={3}>Project Overview</Title>
          <Paragraph>
            {project.description}
          </Paragraph>
          
          {/* If a complete Markdown file path is available, render the entire Markdown */}
          {project.markdownPath ? (
            <div className="project-content">
              <MarkdownRenderer filePath={project.markdownPath} />
            </div>
          ) : (
            <div className="project-content">
              <Title level={3}>Methods</Title>
              {project.methodsMarkdownPath ? (
                <MarkdownRenderer filePath={project.methodsMarkdownPath} />
              ) : (
                <Paragraph>
                  {project.methods || "This project has not provided a detailed methods description yet."}
                </Paragraph>
              )}
              
              <Title level={3}>Results</Title>
              {project.resultsMarkdownPath ? (
                <MarkdownRenderer filePath={project.resultsMarkdownPath} />
              ) : (
                <Paragraph>
                  {project.results || "This project has not provided a detailed results description yet."}
                </Paragraph>
              )}
              
              <Title level={3}>Conclusion</Title>
              {project.conclusionMarkdownPath ? (
                <MarkdownRenderer filePath={project.conclusionMarkdownPath} />
              ) : (
                <Paragraph>
                  {project.conclusion || "This project has not provided a detailed conclusion description yet."}
                </Paragraph>
              )}
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProjectPage;