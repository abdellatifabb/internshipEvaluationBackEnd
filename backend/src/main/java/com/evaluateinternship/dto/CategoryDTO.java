package com.evaluateinternship.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.evaluateinternship.models.Category;
import com.evaluateinternship.models.Competence;

public class CategoryDTO {
    private Long id;
    private String intitule;
    private String value;
    private Long competenceId;
//    private List<Long> competenceIds;

    // Constructors
    public CategoryDTO() {
    }

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.intitule = category.getIntitule();
        this.value = category.getValue();
        this.competenceId= category.getCompetence().getId();
        
//        if (category.getCompetenceList() != null) {
//            this.competenceIds = category.getCompetenceList().stream()
//                .map(competence -> competence.getId())
//                .collect(Collectors.toList());
//        }
    }

    // Convert DTO to Entity
    public Category toEntity() {
        Category category = new Category();
        category.setId(this.id);
        category.setIntitule(this.intitule);
        category.setValue(this.value);
        // Note: The competence relationship would typically be set in the service layer
        if (this.competenceId != null) {
            Competence competence = new Competence();
            competence.setId(this.competenceId);
            category.setCompetence(competence);
        }
        return category;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

//    public List<Long> getCompetenceIds() {
//        return competenceIds;
//    }
//
//    public void setCompetenceIds(List<Long> competenceIds) {
//        this.competenceIds = competenceIds;
//    }

    public Long getCompetenceId() {
        return competenceId;
    }

    public void setCompetenceId(Long competenceId) {
        this.competenceId = competenceId;
    }
}
