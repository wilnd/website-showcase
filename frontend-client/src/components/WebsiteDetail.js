import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Alert, Tag } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const WebsiteDetail = () => {
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/websites/${id}`);
        setWebsite(response.data);
      } catch (err) {
        setError('获取网站详情失败');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWebsite();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert message="错误" description={error} type="error" />
        <Button onClick={() => navigate('/')} style={{ marginTop: 16 }}>
          返回首页
        </Button>
      </div>
    );
  }

  if (!website) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert message="未找到网站信息" type="warning" />
        <Button onClick={() => navigate('/')} style={{ marginTop: 16 }}>
          返回首页
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Button onClick={() => navigate('/')} style={{ marginBottom: 20 }}>
        ← 返回
      </Button>
      
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1>
          {website.title}
          <Tag style={{ marginLeft: 15 }} color="blue">点击: {website.clickCount || 0}</Tag>
        </h1>
        {website.imageUrl && (
          <img 
            src={website.imageUrl} 
            alt={website.title} 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        )}
      </div>
      
      <div style={{ marginBottom: 30 }}>
        <h2>网站描述</h2>
        <p>{website.description || '暂无描述'}</p>
      </div>
      
      <div style={{ marginBottom: 30 }}>
        <h2>网站链接</h2>
        <p>
          <a href={website.url} target="_blank" rel="noopener noreferrer">
            {website.url}
          </a>
        </p>
      </div>
      
      <div>
        <h2>创建时间</h2>
        <p>{new Date(website.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WebsiteDetail;