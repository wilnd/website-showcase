package com.example.showcase.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {
    @Override public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://client.chblog.fun:8443")  // 精确到端口
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(false)    // 不带凭证最省心
                .maxAge(3600);
    }
}