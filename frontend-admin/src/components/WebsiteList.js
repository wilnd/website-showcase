import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WebsiteList = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchWebsites = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/websites');
      setWebsites(response.data.content);
    } catch (error) {
      message.error('获取网站列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/websites/${id}`);
      message.success('删除成功');
      fetchWebsites();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => <a href={text} target="_blank" rel="noreferrer">{text}</a>,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => navigate(`/websites/edit/${record.id}`)}
            style={{ marginRight: 8 }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个网站吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => navigate('/websites/new')}
        >
          添加网站
        </Button>
      </div>
      <Table 
        dataSource={websites} 
        columns={columns} 
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default WebsiteList;