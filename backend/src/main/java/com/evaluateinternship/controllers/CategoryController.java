package com.evaluateinternship.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.evaluateinternship.models.Category;
import com.evaluateinternship.services.CategoryService;
import com.evaluateinternship.dto.CategoryDTO;
import com.evaluateinternship.dto.mapper.EntityDTOMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final EntityDTOMapper mapper;
    
    public CategoryController(CategoryService categoryService, EntityDTOMapper mapper) {
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    @GetMapping("/")
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return categories.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/competence/{competenceId}")
    public List<CategoryDTO> getCategoriesByCompetenceId(@PathVariable Long competenceId) {
        List<Category> categories = categoryService.getCategoriesByCompetenceId(competenceId);
        return categories.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }
    
//    @PostMapping("/")
//    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO) {
//        Category category = categoryDTO.toEntity();
//        Category savedCategory = categoryService.createCategory(category);
//        return mapper.toDTO(savedCategory);
//    }

    @PostMapping("/")
    public List<CategoryDTO> createCategories(@RequestBody List<CategoryDTO> categoryDTOs) {
        // Convert DTOs to entities
        List<Category> categories = categoryDTOs.stream()
                .map(CategoryDTO::toEntity)
                .collect(Collectors.toList());

        // Save all categories
        System.out.println("categories: " + categories.get(0).getCompetence().getId());
        List<Category> savedCategories = categoryService.createCategories(categories);

        // Convert entities back to DTOs
        return savedCategories.stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(c -> ResponseEntity.ok(mapper.toDTO(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        if (!categoryService.getCategoryById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Category category = categoryDTO.toEntity();
        category.setId(id);
        Category updatedCategory = categoryService.updateCategory(category);
        return ResponseEntity.ok(mapper.toDTO(updatedCategory));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (!categoryService.getCategoryById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
