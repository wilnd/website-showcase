package com.example.showcase.service;

import com.example.showcase.entity.Website;
import com.example.showcase.entity.WebsiteClick;
import com.example.showcase.repository.WebsiteClickRepository;
import com.example.showcase.repository.WebsiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class WebsiteClickService {
    
    @Autowired
    private WebsiteClickRepository websiteClickRepository;
    
    @Autowired
    private WebsiteRepository websiteRepository;
    
    public void recordClick(Long websiteId, HttpServletRequest request) {
        // 增加网站点击次数
        websiteRepository.incrementClickCount(websiteId);
        
        // 记录点击详情
        WebsiteClick click = new WebsiteClick();
        
        // 获取网站实体
        Website website = websiteRepository.findById(websiteId).orElse(null);
        if (website != null) {
            click.setWebsite(website);
            
            // 获取IP地址
            String ipAddress = getClientIpAddress(request);
            click.setIpAddress(ipAddress);
            
            // 获取User-Agent
            String userAgent = request.getHeader("User-Agent");
            click.setUserAgent(userAgent);
            
            // 保存点击记录
            websiteClickRepository.save(click);
        }
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}