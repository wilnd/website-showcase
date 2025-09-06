import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebsiteList from './components/WebsiteList';
import WebsiteDetail from './components/WebsiteDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>网站展示平台</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<WebsiteList />} />
            <Route path="/websites" element={<WebsiteList />} />
            <Route path="/websites/:id" element={<WebsiteDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;