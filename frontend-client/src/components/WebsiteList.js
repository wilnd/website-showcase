import React, { useState, useEffect } from 'react';
import { Card, Button, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './WebsiteList.css';

const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const fetchWebsites = async (pageNum) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/websites?page=${pageNum}&size=10`);
      const newWebsites = response.data.content;
      
      if (pageNum === 0) {
        setWebsites(newWebsites);
      } else {
        setWebsites(prev => [...prev, ...newWebsites]);
      }
      
      setHasMore(!response.data.last);
    } catch (error) {
      console.error('获取网站列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites(0);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 100
      && hasMore
      && !loading
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWebsites(nextPage);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]);

  const handleViewDetail = (id) => {
    navigate(`/websites/${id}`);
  };

  if (websites.length === 0 && loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="website-list">
      {websites.map(website => (
        <Card
          key={website.id}
          className="website-card"
          cover={
            website.imageUrl ? (
              <img alt={website.title} src={website.imageUrl} />
            ) : (
              <div style={{ height: 200, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                暂无图片
              </div>
            )
          }
          actions={[
            <Button type="primary" onClick={() => handleViewDetail(website.id)}>
              查看详情
            </Button>
          ]}
        >
          <Card.Meta
            title={website.title}
            description={
              <div>
                <div>{website.description}</div>
                <div style={{ marginTop: 8, fontSize: '12px', color: '#999' }}>
                  {new Date(website.createdAt).toLocaleDateString()}
                </div>
              </div>
            }
          />
        </Card>
      ))}
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', width: '100%' }}>
          <Spin />
        </div>
      )}
      
      {!hasMore && websites.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', width: '100%', color: '#999' }}>
          没有更多内容了
        </div>
      )}
    </div>
  );
};

export default WebsiteList;