import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import WebsiteList from './components/WebsiteList';
import WebsiteForm from './components/WebsiteForm';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                label: '网站管理',
              },
              {
                key: '2',
                label: '添加网站',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <Routes>
                <Route path="/" element={<WebsiteList />} />
                <Route path="/websites" element={<WebsiteList />} />
                <Route path="/websites/new" element={<WebsiteForm />} />
                <Route path="/websites/edit/:id" element={<WebsiteForm />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            网站展示平台 ©2023 Created by Showcase Team
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;