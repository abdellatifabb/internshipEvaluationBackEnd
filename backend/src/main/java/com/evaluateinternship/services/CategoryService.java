package com.evaluateinternship.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.evaluateinternship.models.Category;
import com.evaluateinternship.repositories.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> createCategories(List<Category> categories) {
        return categoryRepository.saveAll(categories);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    public List<Category> getCategoriesByCompetenceId(Long competenceId) {
        return categoryRepository.findByCompetenceId(competenceId);
    }
}
