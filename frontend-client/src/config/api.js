// API配置文件

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

export const API_ENDPOINTS = {
  WEBSITES: `${API_BASE_URL}/api/websites`
};

export default API_BASE_URL;