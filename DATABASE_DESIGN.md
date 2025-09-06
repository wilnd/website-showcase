# 数据库设计

## 1. 网站展示表 (websites)
| 字段名 | 类型 | 约束 | 描述 |
|-------|------|------|------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | 主键 |
| url | VARCHAR(500) | NOT NULL | 网站地址 |
| title | VARCHAR(200) | NOT NULL | 网站标题 |
| description | TEXT | - | 网站描述 |
| image_url | VARCHAR(500) | - | 封面图片URL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | 更新时间 |
| is_active | BOOLEAN | DEFAULT TRUE | 是否激活 |

## 2. 索引
- websites表的url字段添加唯一索引
- websites表的created_at字段添加索引以支持分页查询