package com.example.showcase.controller;

import com.example.showcase.dto.WebsiteDTO;
import com.example.showcase.entity.Website;
import com.example.showcase.service.WebsiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/websites")
@CrossOrigin(origins = "*")
public class WebsiteController {
    
    @Autowired
    private WebsiteService websiteService;
    
    // 管理端：创建或更新网站信息
    @PostMapping
    public ResponseEntity<Website> createWebsite(@Valid @RequestBody WebsiteDTO websiteDTO) {
        Website website = new Website();
        website.setUrl(websiteDTO.getUrl());
        website.setTitle(websiteDTO.getTitle());
        website.setDescription(websiteDTO.getDescription());
        website.setImageUrl(websiteDTO.getImageUrl());
        
        Website savedWebsite = websiteService.saveWebsite(website);
        return new ResponseEntity<>(savedWebsite, HttpStatus.CREATED);
    }
    
    // 管理端：更新网站信息
    @PutMapping("/{id}")
    public ResponseEntity<Website> updateWebsite(@PathVariable Long id, @Valid @RequestBody WebsiteDTO websiteDTO) {
        Optional<Website> existingWebsite = websiteService.getWebsiteById(id);
        if (existingWebsite.isPresent()) {
            Website website = existingWebsite.get();
            website.setUrl(websiteDTO.getUrl());
            website.setTitle(websiteDTO.getTitle());
            website.setDescription(websiteDTO.getDescription());
            website.setImageUrl(websiteDTO.getImageUrl());
            
            Website savedWebsite = websiteService.saveWebsite(website);
            return new ResponseEntity<>(savedWebsite, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // 客户端：获取网站列表（分页）
    @GetMapping
    public ResponseEntity<Page<Website>> getWebsites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Website> websites = websiteService.getWebsites(page, size);
        return new ResponseEntity<>(websites, HttpStatus.OK);
    }
    
    // 管理端：删除网站
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWebsite(@PathVariable Long id) {
        websiteService.deleteWebsite(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    // 客户端：获取单个网站详情
    @GetMapping("/{id}")
    public ResponseEntity<Website> getWebsite(@PathVariable Long id) {
        Optional<Website> website = websiteService.getWebsiteById(id);
        return website.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}