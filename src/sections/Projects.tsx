import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, List, Button, Space, Divider, Tag } from 'antd';
import { projectsData, Project } from '../data/projectsData';
import '../styles/Projects.css';

const { Title, Paragraph } = Typography;

const Projects: React.FC = () => {
  const groupedByYear = projectsData.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  const sortedYears = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="projects-section">
      {sortedYears.map(year => (
        <div key={year}>
          <Divider orientation="left"><Title level={3}>{year}</Title></Divider>
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={groupedByYear[year]}
            renderItem={project => {
              const projectUrl = `/project/${project.title.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <List.Item>
                  <Card 
                    title={<Link to={projectUrl}>{project.title}</Link>}
                    cover={project.imageUrl && <img alt={project.title} src={project.imageUrl} className="project-image" />}
                  >
                    <Paragraph ellipsis={{ rows: 3, expandable: true }}>{project.description}</Paragraph>
                    
                    {project.technologies && (
                      <div className="project-tech-tags">
                        {project.technologies.map((tech, index) => (
                          <Tag key={index} color="blue">{tech}</Tag>
                        ))}
                      </div>
                    )}
                    
                    <Space style={{ marginTop: '15px' }}>
                      <Link to={projectUrl}>
                        <Button type="primary">View Details</Button>
                      </Link>
                    </Space>
                  </Card>
                </List.Item>
              )
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Projects; 