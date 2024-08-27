package com.legacy.demo.classes;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Apply CORS settings to all endpoints
                .allowedOrigins("http://localhost:3000") // Allowed origins (adjust as needed)
                .allowedMethods("GET", "POST", "PATCH", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allowed headers
                .exposedHeaders("Content-Type", "Authorization") // Headers to expose
                .allowCredentials(true); // Allow credentials (cookies, HTTP authentication)
    }
}
