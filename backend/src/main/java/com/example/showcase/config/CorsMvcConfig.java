package com.example.showcase.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Spring 5.3+/Boot 2.4+ 可用 allowedOriginPatterns 支持通配
                // 如果你是更早的 2.x，没有 allowedOriginPatterns，就把下一行换成 allowedOrigins 并枚举域名
                .allowedOriginPatterns("https://client.chblog.fun", "https://*.chblog.fun", "http://localhost:*")
                // .allowedOrigins("https://client.chblog.fun","http://localhost:3000") // 老版本用这个
                .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Location")
                .allowCredentials(true)
                .maxAge(3600);
    }
}