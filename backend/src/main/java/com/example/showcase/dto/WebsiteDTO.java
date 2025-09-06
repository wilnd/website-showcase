package com.example.showcase.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class WebsiteDTO {
    private Long id;
    
    @NotBlank(message = "URL不能为空")
    @Size(max = 500, message = "URL长度不能超过500个字符")
    private String url;
    
    @NotBlank(message = "标题不能为空")
    @Size(max = 200, message = "标题长度不能超过200个字符")
    private String title;
    
    @Size(max = 1000, message = "描述长度不能超过1000个字符")
    private String description;
    
    @Size(max = 500, message = "图片URL长度不能超过500个字符")
    private String imageUrl;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}