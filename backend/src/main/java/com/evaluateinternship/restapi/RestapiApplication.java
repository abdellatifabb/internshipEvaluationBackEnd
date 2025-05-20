package com.evaluateinternship.restapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EntityScan("com.evaluateinternship.models")
@ComponentScan(basePackages = "com.evaluateinternship")  // 👈 Add this!
@EnableJpaRepositories(basePackages = "com.evaluateinternship.repositories")

@SpringBootApplication
public class RestapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestapiApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
						.addMapping("/**")
						.allowedOrigins("http://localhost:3000", "http://192.168.56.1:3000")
						.allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
						.allowedHeaders("Content-Type","Authorization","X-Requested-With")
						.allowCredentials(true);
			}
		};
	}
}
