import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const WebsiteForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchWebsite();
    }
  }, [id]);

  const fetchWebsite = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/websites/${id}`);
      form.setFieldsValue(response.data);
    } catch (error) {
      message.error('获取网站信息失败');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (id) {
        // 更新
        await axios.put(`${API_BASE_URL}/api/websites/${id}`, values);
        message.success('更新成功');
      } else {
        // 创建
        await axios.post(`${API_BASE_URL}/api/websites`, values);
        message.success('创建成功');
      }
      navigate('/websites');
    } catch (error) {
      message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? '编辑网站' : '添加网站'}</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="url"
          label="网站地址"
          rules={[{ required: true, message: '请输入网站地址' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="imageUrl"
          label="图片URL"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? '更新' : '创建'}
          </Button>
          <Button 
            style={{ marginLeft: 8 }}
            onClick={() => navigate('/websites')}
          >
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WebsiteForm;