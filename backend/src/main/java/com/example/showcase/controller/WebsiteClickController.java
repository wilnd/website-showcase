package com.example.showcase.controller;

import com.example.showcase.service.WebsiteClickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/websites")
@CrossOrigin(origins = "*")
public class WebsiteClickController {
    
    @Autowired
    private WebsiteClickService websiteClickService;
    
    // 记录网站点击
    @PostMapping("/{id}/click")
    public ResponseEntity<Void> recordClick(@PathVariable Long id, HttpServletRequest request) {
        try {
            websiteClickService.recordClick(id, request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}