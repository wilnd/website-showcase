# 数据库设计

## 1. 网站展示表 (websites)
| 字段名 | 类型 | 约束 | 描述 |
|-------|------|------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 主键 |
| url | VARCHAR(500) | NOT NULL | 网站地址 |
| title | VARCHAR(200) | NOT NULL | 网站标题 |
| description | TEXT | - | 网站描述 |
| image_url | VARCHAR(500) | - | 封面图片URL |
| click_count | INT | DEFAULT 0 | 点击次数 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_active | BOOLEAN | DEFAULT TRUE | 是否激活 |

## 2. 点击记录表 (website_clicks)
| 字段名 | 类型 | 约束 | 描述 |
|-------|------|------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 主键 |
| website_id | BIGINT | FOREIGN KEY REFERENCES websites(id) | 网站ID |
| ip_address | VARCHAR(45) | - | 点击者IP地址 |
| user_agent | TEXT | - | 用户代理信息 |
| clicked_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 点击时间 |

## 3. 索引
- websites表的url字段添加唯一索引
- websites表的created_at字段添加索引以支持分页查询
- website_clicks表的website_id字段添加索引
- website_clicks表的clicked_at字段添加索引