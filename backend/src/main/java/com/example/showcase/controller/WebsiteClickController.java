package com.example.showcase.controller;

import com.example.showcase.service.WebsiteClickService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
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
            log.error("Error recording click: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}