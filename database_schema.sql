-- 网站展示平台数据库结构

-- 创建数据库
CREATE DATABASE IF NOT EXISTS website_showcase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE website_showcase;

-- 创建网站表
CREATE TABLE IF NOT EXISTS websites (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    url VARCHAR(500) NOT NULL COMMENT '网站地址',
    title VARCHAR(200) NOT NULL COMMENT '网站标题',
    description TEXT COMMENT '网站描述',
    image_url VARCHAR(500) COMMENT '封面图片URL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否激活'
) COMMENT '网站信息表';

-- 添加索引
CREATE INDEX idx_websites_created_at ON websites (created_at);
CREATE INDEX idx_websites_is_active ON websites (is_active);
CREATE UNIQUE INDEX idx_websites_url ON websites (url);

-- 插入示例数据
INSERT INTO websites (url, title, description, image_url) VALUES
('https://www.google.com', 'Google', '全球最大的搜索引擎', 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'),
('https://www.github.com', 'GitHub', '全球最大的代码托管平台', 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'),
('https://stackoverflow.com', 'Stack Overflow', '程序员问答社区', 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png');