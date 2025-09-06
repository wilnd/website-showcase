package com.example.showcase.service;

import com.example.showcase.entity.Website;
import com.example.showcase.repository.WebsiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WebsiteService {
    
    @Autowired
    private WebsiteRepository websiteRepository;
    
    public Website saveWebsite(Website website) {
        return websiteRepository.save(website);
    }
    
    public Optional<Website> getWebsiteById(Long id) {
        return websiteRepository.findById(id);
    }
    
    public Page<Website> getWebsites(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return websiteRepository.findByIsActiveTrueOrderByClickCountDesc(pageable);
    }
    
    public List<Website> getAllWebsites() {
        return websiteRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }
    
    public void deleteWebsite(Long id) {
        websiteRepository.deleteById(id);
    }
    
    public int getClickCount(Long websiteId) {
        Optional<Website> website = websiteRepository.findById(websiteId);
        return website.map(Website::getClickCount).orElse(0);
    }
}