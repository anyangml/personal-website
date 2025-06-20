import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Tabs } from 'antd';
import About from './sections/About';
import Home from './sections/Home';
import Projects from './sections/Projects';
import Blog from './sections/Blog';
import ProjectPage from './sections/ProjectPage';
import './styles/App.css';

const { Content } = Layout;
const { TabPane } = Tabs;

interface MainLayoutProps {
  defaultTab?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ defaultTab = "1" }) => {
  const [activeKey, setActiveKey] = useState(defaultTab);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we're coming back from a project page
    const fromProject = location.state && location.state.fromProject;
    if (fromProject) {
      setActiveKey("2"); // Set to Projects tab
    }
  }, [location]);

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    // Update the URL to reflect the current tab without reloading
    // This makes browser history work better
    if (key === "1") {
      navigate("/", { replace: true });
    } else if (key === "2") {
      navigate("/?tab=projects", { replace: true });
    } else if (key === "3") {
      navigate("/?tab=blog", { replace: true });
    }
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px', marginTop: '64px' }}>
        <div className="site-layout-content">
          <About />
          <Tabs activeKey={activeKey} onChange={handleTabChange} centered>
            <TabPane tab="Home" key="1">
              <Home />
            </TabPane>
            <TabPane tab="Projects" key="2">
              <Projects />
            </TabPane>
            <TabPane tab="Blog" key="3">
              <Blog />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

// Wrapper to handle location and navigation context
const MainLayoutWrapper: React.FC = () => {
  const location = useLocation();
  
  // Check if the URL has a tab parameter
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  
  // Map URL parameter to tab key
  let defaultTab = "1"; // Default to Home tab
  if (tabParam === 'projects') {
    defaultTab = "2";
  } else if (tabParam === 'blog') {
    defaultTab = "3";
  }
  
  return <MainLayout defaultTab={defaultTab} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayoutWrapper />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
